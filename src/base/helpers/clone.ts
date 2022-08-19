export default <T extends {}>(target: T): T => JSON.parse(JSON.stringify(target));

// export default<T extends {}>(target: T): T => target;