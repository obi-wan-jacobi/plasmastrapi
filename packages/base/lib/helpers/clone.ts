export default <T extends {}>(target: T): T => JSON.parse(JSON.stringify(target));
