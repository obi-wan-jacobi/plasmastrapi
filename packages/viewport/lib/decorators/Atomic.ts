export default function Atomic({}, {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function (): void {
    this._ctx.save();
    fn.apply(this, arguments);
    this._ctx.restore();
  };
}
