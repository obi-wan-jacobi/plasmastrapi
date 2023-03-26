import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import { AnimationComponent, IAnimation } from '@plasmastrapi/presentation';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';
import { getAbsolutePose } from '@plasmastrapi/helpers';

export default class AnimationSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(AnimationComponent)((animation) => {
      const pose = getAbsolutePose(animation.$entity as IEntity);
      if (!pose) {
        return;
      }
      const animationData = animation.copy() as IAnimation & { idur?: number };
      if (animationData.idur === undefined) {
        animationData.idur = 0;
      }
      if (animationData.idur === animationData.duration) {
        animationData.idur = 0;
        if (animationData.isReversed) {
          animationData.frame--;
        } else {
          animationData.frame++;
        }
        if (animationData.frame > animationData.images.length - 1) {
          animationData.frame = 0;
        }
        if (animationData.frame < 0) {
          animationData.frame = animationData.images.length - 1;
        }
      } else if (!animationData.isPaused) {
        animationData.idur++;
      }
      animation.patch(animationData);
      viewport.drawImage({
        pose,
        image: animationData.images[animationData.frame],
      });
    });
  }
}
