import { Component, Entity } from '../lib';

class MyEntity extends Entity {}

interface IMyComponentData {
  complex: {
    propertyA: string;
    propertyB: number;
    propertyC?: any;
    propertyD?: {
      innerA: string;
      innerB: number;
    };
  };
  simple?: any;
}

class MyComponent extends Component<IMyComponentData> {}

describe(Component.name, () => {
  it('mutate should respect and persist undefined values', () => {
    const myEntity = new MyEntity();
    const myComponentData = {
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: { a: 1, b: 2, c: 3 },
        propertyD: {
          innerA: 'yet another string value',
          innerB: 8008135,
        },
      },
      simple: { e: 4, f: 5, g: 6 },
    };
    const myComponent = new MyComponent({
      entity: myEntity,
      data: myComponentData,
    });
    expect(myComponent.copy()).toEqual(myComponentData);
    const mutatedData = myComponent.copy();
    mutatedData.simple = undefined;
    mutatedData.complex.propertyC = undefined;
    mutatedData.complex.propertyD = undefined;
    myComponent.mutate(mutatedData);
    // original component data should be preserved
    expect(myComponentData).toEqual({
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: { a: 1, b: 2, c: 3 },
        propertyD: {
          innerA: 'yet another string value',
          innerB: 8008135,
        },
      },
      simple: { e: 4, f: 5, g: 6 },
    });
    expect(myComponent.copy()).toEqual({
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: undefined,
        propertyD: undefined,
      },
      simple: undefined,
    });
  });

  it('patch should respect and persist undefined values', () => {
    const myEntity = new MyEntity();
    const myComponentData = {
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: { a: 1, b: 2, c: 3 },
        propertyD: {
          innerA: 'yet another string value',
          innerB: 8008135,
        },
      },
      simple: { e: 4, f: 5, g: 6 },
    };
    const myComponent = new MyComponent({
      entity: myEntity,
      data: myComponentData,
    });
    expect(myComponent.copy()).toEqual(myComponentData);
    const mutatedData = myComponent.copy();
    mutatedData.simple = undefined;
    mutatedData.complex.propertyC = undefined;
    mutatedData.complex.propertyD = undefined;
    myComponent.patch({
      complex: {
        propertyC: undefined,
        propertyD: undefined,
      },
      simple: undefined,
    });
    // original component data should be preserved
    expect(myComponentData).toEqual({
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: { a: 1, b: 2, c: 3 },
        propertyD: {
          innerA: 'yet another string value',
          innerB: 8008135,
        },
      },
      simple: { e: 4, f: 5, g: 6 },
    });
    expect(myComponent.copy()).toEqual({
      complex: {
        propertyA: 'this is a string value',
        propertyB: 80085,
        propertyC: undefined,
        propertyD: undefined,
      },
      simple: undefined,
    });
  });
});
