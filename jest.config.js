module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@my-folder/(.*)': '<rootDir>/src/my-folder/$1',
  },
};
