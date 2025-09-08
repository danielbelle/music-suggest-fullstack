import api from "../api";

test("should have correct base URL", () => {
  expect(api.defaults.baseURL).toBe("http://localhost:9000/api");
});
