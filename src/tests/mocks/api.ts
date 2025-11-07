import { vi } from "vitest";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type ApiMock = Record<HttpMethod, ReturnType<typeof vi.fn>> & {
  defaults: { headers: { common: Record<string, string> } };
};

const createApiMock = (): ApiMock => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  defaults: { headers: { common: {} } },
});

export const apiMock = createApiMock();

export const resetApiMock = () => {
  apiMock.get.mockReset();
  apiMock.post.mockReset();
  apiMock.put.mockReset();
  apiMock.patch.mockReset();
  apiMock.delete.mockReset();
  apiMock.defaults.headers.common = {};
};
