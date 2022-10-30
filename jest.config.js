module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: "\.spec\.(ts|tsx|js)$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters: [ "default", ["jest-junit",{
        outputDirectory: 'reports', outputName: 'junit.xml',
    } ] ],
    "testResultsProcessor": "jest-teamcity-reporter",
    setupFiles: ["./.env.test"],
    "coverageReporters": ["lcov", "text", "teamcity"],
    testTimeout: 30 * 1000
}

