// frontend/src/services/__tests__/api.test.js
import { api } from "../api";

// Mock do axios se necessário
jest.mock("axios");

describe("API Service", () => {
  test("should have correct base URL", () => {
    expect(api.defaults.baseURL).toBe("http://localhost:9000/api");
  });
});
