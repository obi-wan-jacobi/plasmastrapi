import { Entity } from '@plasmastrapi/ecs';
import AnimationComponent from '../lib/components/AnimationComponent';

class MyEntity extends Entity {}

describe(AnimationComponent.name, () => {
  it('can add component to Entity', () => {
    const myEntity = new MyEntity();
    expect(
      myEntity.$add(AnimationComponent, {
        frame: 0,
        images: [],
        durationMs: 0,
      }),
    ).toEqual(myEntity);
  });
});
