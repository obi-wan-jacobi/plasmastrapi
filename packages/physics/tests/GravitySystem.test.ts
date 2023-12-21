import { COMPONENTS, Entity } from '@plasmastrapi/ecs';
import GravitySystem from '../lib/systems/GravitySystem';
import GravityComponent from '../lib/components/GravityComponent';
import AccelerationComponent from '../lib/components/AccelerationComponent';
import VelocityComponent from '../lib/components/VelocityComponent';
import AccelerationSystem from '../lib/systems/AccelerationSystem';

class MyEntity extends Entity {}

describe(GravitySystem.name, () => {
  it('should not update $.previous values', () => {
    const myEntity = new MyEntity();
    myEntity.$add(AccelerationComponent, { x: 0, y: 0, w: 0 });
    myEntity.$add(GravityComponent, { x: 500, y: -600 });
    myEntity.$add(VelocityComponent, { x: 0, y: 0, w: 0 });
    COMPONENTS.upkeep();
    let velocity = myEntity.$copy(VelocityComponent);
    // check $.previous not populated
    expect(velocity).toEqual({ x: 0, y: 0, w: 0 });
    // run the system and check again
    const gravitySystem = new GravitySystem();
    gravitySystem.once({ components: COMPONENTS, deltaTime: 15 });
    velocity = myEntity.$copy(VelocityComponent);
    expect(velocity).toEqual({ x: 7.5, y: -9, w: 0 });
  });

  it(`should not update $.previous values alongside ${AccelerationSystem.name}`, () => {
    const myEntity = new MyEntity();
    myEntity.$add(AccelerationComponent, { x: 12, y: -13, w: 0 });
    myEntity.$add(GravityComponent, { x: 500, y: -600 });
    myEntity.$add(VelocityComponent, { x: 0, y: 0, w: 0 });
    COMPONENTS.upkeep();
    let velocity = myEntity.$copy(VelocityComponent);
    // check $.previous not yet populated
    expect(velocity).toEqual({ x: 0, y: 0, w: 0 });
    // run the system and check again
    const accelerationSystem = new AccelerationSystem();
    const gravitySystem = new GravitySystem();
    accelerationSystem.once({ components: COMPONENTS, deltaTime: 15 });
    gravitySystem.once({ components: COMPONENTS, deltaTime: 15 });
    velocity = myEntity.$copy(VelocityComponent);
    expect(velocity).toEqual({ x: 7.68, y: -9.195, w: 0, $: { previous: { x: 0, y: 0, w: 0 } } });
    // and again
    accelerationSystem.once({ components: COMPONENTS, deltaTime: 15 });
    gravitySystem.once({ components: COMPONENTS, deltaTime: 15 });
    velocity = myEntity.$copy(VelocityComponent);
    expect(velocity).toEqual({ x: 15.36, y: -18.39, w: 0, $: { previous: { x: 7.68, y: -9.195, w: 0 } } });
  });
});
