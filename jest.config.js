module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  collectCoverage: true, // Enable code coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Specify which files to include for coverage
    "!src/index.js", // Exclude files you don't want to include in coverage
  ],
  coverageDirectory: "coverage", // Directory where coverage reports will be saved
  coverageReporters: ["json", "html", "text"], // Formats of coverage reports
};
