const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000/",
    options: {
      "sonar.projectKey": "c0bb45702bad3ec5fcd08d4998d3775d77728130",
      "sonar.projectName": "angular-sonarqube",
      "sonar.login": "admin",
      "sonar.password": "masterkey",
      "sonar.projectVersion": "1.1.0",

      "sonar.sources": "src",
      "sonar.tests": "src",
      "sonar.exclusions": "**/node_modules/**,**/*.spec.ts,**/*test.ts,**/*.js",
      "sonar.test.inclusions": "**/*.spec.ts,**/*test.ts",
      "sonar.coverage.exclusions": "**/*.js,src/main.ts,src/polyfills.ts,**/*environment*.ts,**/*module.ts,**/*routing.ts",

      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml",
    },
  },
  () => {}
);
