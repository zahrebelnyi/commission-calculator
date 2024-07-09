/** @type {import('jest').Config} */

const config = {
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'coverage',
    collectCoverage: true,
    transform: {
        '^.+\\.(js|mjs)$': 'babel-jest'
    },
    moduleFileExtensions: ['mts', 'cts', 'js'],
    collectCoverageFrom: [
        "src/**/*.{js,mjs,cjs,ts}",
        "!**/*.d.ts",
        "!src/index.{js,mjs,cjs,ts}",
        "!src/constants/**",
        "!**/node_modules/**",
    ],
    coveragePathIgnorePatterns: ['/node_modules/'],
};

export default config;
