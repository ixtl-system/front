import "@testing-library/jest-dom";

import { vi } from "vitest";

import { messageMock, notificationMock, resetAntdMocks } from "@/tests/mocks/antd";
import { apiMock, resetApiMock } from "@/tests/mocks/api";

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

const matchMediaImplementation = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

const matchMediaMock = vi.fn(matchMediaImplementation);

const createComputedStyle = () => ({
  getPropertyValue: () => "",
  content: "",
  scrollbarColor: "",
  scrollbarWidth: "none",
  pointerEvents: "auto",
  visibility: "visible",
  display: "block",
  width: "0px",
  height: "0px",
});

const getComputedStyleMock = vi.fn(createComputedStyle);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});

Object.defineProperty(window, "getComputedStyle", {
  writable: true,
  value: getComputedStyleMock,
});

beforeEach(() => {
  resetApiMock();
  resetAntdMocks();
  localStorage.clear();
  sessionStorage.clear();
  matchMediaMock.mockClear();
  matchMediaMock.mockImplementation(matchMediaImplementation);
  getComputedStyleMock.mockClear();
  getComputedStyleMock.mockImplementation(createComputedStyle);
});

if (!window.ResizeObserver) {
  class ResizeObserverStub implements ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }

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

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

if (!document.createRange) {
  (document as Document & { createRange?: typeof document.createRange }).createRange = () => ({
    setStart: vi.fn(),
    setEnd: vi.fn(),
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
    selectNode: vi.fn(),
    selectNodeContents: vi.fn(),
    cloneContents: vi.fn(),
    insertNode: vi.fn(),
    surroundContents: vi.fn(),
    compareBoundaryPoints: vi.fn(),
    deleteContents: vi.fn(),
    detach: vi.fn(),
    extractContents: vi.fn(),
    collapse: vi.fn(),
  }) as unknown as typeof document.createRange;
}

declare global {
   
  var antdMessageMock: typeof messageMock;
   
  var antdNotificationMock: typeof notificationMock;
   
  var axiosApiMock: typeof apiMock;
}

globalThis.antdMessageMock = messageMock;
globalThis.antdNotificationMock = notificationMock;
(globalThis as any).axiosApiMock = apiMock;
