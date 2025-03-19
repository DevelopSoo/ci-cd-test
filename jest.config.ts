import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  //  restoreMocks: true, // 각 테스트 후 모든 mock을 자동으로 복원
  //  clearMocks: true, // 각 테스트 전에 mock 데이터를 clear
  //  resetMocks: true, // 각 테스트 전에 mock을 초기 상태로 reset
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
