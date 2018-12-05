module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "src/.*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  verbose: true,
  bail: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html'] 
}