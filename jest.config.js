/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testTimeout: 10000,
  collectCoverageFrom: [
    "*.ts",
    "!*.d.ts",
    "!jest.config.js",
    "!node_modules/**",
  ],
  verbose: true,
};
