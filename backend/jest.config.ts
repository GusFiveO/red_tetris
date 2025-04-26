import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        //the content you'd placed at "global"
        babel: true,
        tsConfig: 'tsconfig.json',
      },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/classes/*.{ts,tsx}', '!**/node_modules/**'],
  coverageReporters: ['lcov', 'text-summary'],
};

export default config;
