import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";

const apiMock = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  defaults: {
    headers: {
      common: {},
    },
  },
};

const messageMock = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  loading: vi.fn(),
  open: vi.fn(),
};

const notificationMock = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  open: vi.fn(),
};

vi.mock("@/shared/infra/api", () => ({
  api: apiMock,
}));

vi.mock("@/assets/icon.png", () => "icon-mock.png");
vi.mock("@/assets/logo-md.png", () => "logo-mock.png");
vi.mock("@/assets/icons/SunHorizon", () => ({
  SunHorizon: () => <svg data-testid="sun-horizon-icon" />,
}));

vi.mock("antd", async () => {
  const actual = await vi.importActual<any>("antd");

  return {
    ...actual,
    message: messageMock,
    notification: {
      ...actual.notification,
      ...notificationMock,
    },
  };
});

beforeEach(() => {
  apiMock.get.mockReset();
  apiMock.post.mockReset();
  apiMock.put.mockReset();
  apiMock.patch.mockReset();
  apiMock.delete.mockReset();

  Object.values(messageMock).forEach(mockFn => mockFn.mockReset());
  Object.values(notificationMock).forEach(mockFn => mockFn.mockReset());
});

afterEach(() => {
  vi.clearAllMocks();
});

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  value: class ResizeObserver {
    observe() {
      return null;
    }

    unobserve() {
      return null;
    }

    disconnect() {
      return null;
    }
  },
});

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// Provide globals for test convenience
Object.assign(globalThis, {
  __apiMock: apiMock,
  __messageMock: messageMock,
  __notificationMock: notificationMock,
});

declare global {
  // eslint-disable-next-line no-var
  var __apiMock: typeof apiMock;
  // eslint-disable-next-line no-var
  var __messageMock: typeof messageMock;
  // eslint-disable-next-line no-var
  var __notificationMock: typeof notificationMock;
}
