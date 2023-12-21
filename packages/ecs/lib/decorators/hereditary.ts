import IEntity from '../interfaces/IEntity';

// propagate method call to all children
export default function Hereditary({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  //https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
  descriptor.value = {
    [fn.name]() {
      if (!this._children) {
        throw new Error(`${this.constructor.name} has no lineage!`);
      }
      fn.apply(this, arguments);
      this._children.forEach((child: IEntity) => {
        if (!(child as any)[fn.name]) {
          return;
        }
        return (child as any)[fn.name](...arguments);
      });
    },
  }[fn.name];
}
