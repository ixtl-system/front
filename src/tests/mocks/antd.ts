import { vi } from "vitest";

export const messageMock = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  loading: vi.fn(),
};

export const notificationMock = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  open: vi.fn(),
};

export const resetAntdMocks = () => {
  Object.values(messageMock).forEach(mock => mock.mockReset());
  Object.values(notificationMock).forEach(mock => mock.mockReset());
};
