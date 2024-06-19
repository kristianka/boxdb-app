// https://vitejs.dev/config/
export default {
  test: {
    environment: "jsdom",
    setupFiles: "./testSetup.ts",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/e2e/**"],
  },
};
