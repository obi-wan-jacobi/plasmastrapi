// trigger subscribed observer callbacks
export function Observable({}: {}, {}: {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = {
    [fn.name]() {
      if (!this._observedMethods) {
        throw new Error(`${this.constructor.name} is missing observable methods!`);
      }
      const result = fn.apply(this, arguments);
      const subscribers = this._observedMethods.read(fn.name);
      if (subscribers) {
        subscribers.forEach((fn: () => void) => fn());
      }
      return result;
    },
  }[fn.name];
}
