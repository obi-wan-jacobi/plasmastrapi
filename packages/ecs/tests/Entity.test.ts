import { Entity, COMPONENTS, Component } from '../lib';

class MyEntity extends Entity {}

interface IMyComponentData {
  property1: any;
}

class MyComponent extends Component<IMyComponentData> {}

describe('Entity', () => {
  it('should overwrite pre-added components', () => {
    const myEntity = new MyEntity();
    myEntity.$add(MyComponent, { property1: 'value1' });
    myEntity.$add(MyComponent, { property1: 'value2' });
    expect(myEntity.$get(MyComponent)?.copy()).toEqual({ property1: 'value2' });
    expect(myEntity.$copy(MyComponent)).toEqual({ property1: 'value2' });
    COMPONENTS.upkeep();
    expect(COMPONENTS.count(MyComponent)).toEqual(1);
  });
});
