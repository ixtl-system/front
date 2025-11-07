import "@testing-library/jest-dom";
import { vi } from "vitest";

import { apiMock, resetApiMock } from "@/tests/mocks/api";
import { messageMock, notificationMock, resetAntdMocks } from "@/tests/mocks/antd";

vi.mock("@/shared/infra/api", () => ({
  api: apiMock,
}));

vi.mock("antd", async () => {
  const antd = await vi.importActual<typeof import("antd")>("antd");

  return {
    ...antd,
    message: messageMock,
    notification: notificationMock,
  };
});

const createMatchMedia = () =>
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

beforeEach(() => {
  resetApiMock();
  resetAntdMocks();
  localStorage.clear();
});

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: createMatchMedia(),
  });
}

if (!window.ResizeObserver) {
  class ResizeObserverStub implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

  // @ts-expect-error - assigning stub to window for testing environment
  window.ResizeObserver = ResizeObserverStub;
}

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "open", {
  writable: true,
  value: vi.fn(),
});

declare global {
  // eslint-disable-next-line no-var
  var antdMessageMock: typeof messageMock;
  // eslint-disable-next-line no-var
  var antdNotificationMock: typeof notificationMock;
  // eslint-disable-next-line no-var
  var axiosApiMock: typeof apiMock;
}

globalThis.antdMessageMock = messageMock;
globalThis.antdNotificationMock = notificationMock;
(globalThis as any).axiosApiMock = apiMock;
