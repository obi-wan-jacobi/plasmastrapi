import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IEntity from 'engine/interfaces/IEntity';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import { entitiesTouch } from 'foundation/helpers/entities';
import VelocityComponent from '../components/VelocityComponent';

export default class CollisionSystem extends System {

  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    // const rigidBodies = components.toArray(RigidBodyComponent);
    // if (rigidBodies.length < 2) {
    //   return;
    // }
    // for (let i = 0; i <= rigidBodies.length - 2; i++) {
    //   const entityA = rigidBodies[i].$entity;
    //   for (let j = i + 1; j <= rigidBodies.length - 1; j++) {
    //     const entityB = rigidBodies[j].$entity;
    //     if (!entitiesTouch(entityA, entityB)) {
    //       continue;
    //     }
    //     rollBackEntityPoses(entityA, entityB, delta * 0.1);
    //     rollBackParents(entityA as IEntity);
    //     rollBackParents(entityB as IEntity);
    //   }
    // }
  }

}

function rollBackEntityPoses(entityA: IEntity, entityB: IEntity, delta: number) {
  rollBackEntityPose(entityA, delta);
  rollBackEntityPose(entityB, delta);
  if (entitiesTouch(entityA, entityB)) {
    rollBackEntityPoses(entityA, entityB, delta);
  }
}

function rollBackEntityPose(entity: IEntity, delta: number) {
  return rollEntityPose(entity, delta, -1);
}

function rollForwardEntityPose(entity: IEntity, delta: number) {
  return rollEntityPose(entity, delta, 1);
}

function rollEntityPose(entity: IEntity, delta: number, sign: 1 | -1) {
  let pose = entity.$copy(PoseComponent)!;
  const velocity = entity.$copy(VelocityComponent) || { x: 0, y: 0, w: 0 };
  pose = {
    x: pose.x + sign * velocity.x * delta,
    y: pose.y + sign * velocity.y * delta,
    a: pose.a + sign * velocity.w * delta,
  };
  entity.$patch(PoseComponent, pose);
}

function rollBackParents(entity: IEntity) {
  let target: IEntity | undefined = entity;
  while(!!target && target.$copy(PoseComponent) && target.$parent) {
    const childPose = target.$copy(PoseComponent)!;
    const childRelativePose = target.$copy(PoseComponent)!;
    target.$parent.$patch(PoseComponent, {
      x: childPose.x - childRelativePose.x,
      y: childPose.y - childRelativePose.y,
      a: childPose.a - childRelativePose.a,
    });
    target = target.$parent;
  }
}