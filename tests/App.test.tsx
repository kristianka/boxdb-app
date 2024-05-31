import React from "react";
import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
  });
});
