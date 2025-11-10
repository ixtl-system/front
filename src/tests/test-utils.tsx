import { ReactElement, ReactNode } from "react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { RenderHookOptions, RenderHookResult, render, renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { AuthContext } from "@/shared/context/AuthContext";
import { EventContext } from "@/shared/context/EventContext";
import { UserContext } from "@/shared/context/UserContext";
import { Event, EventRegistration, EventType } from "@/shared/types/Event";
import { IPersonalInformation } from "@/pages/user/dtos";

export type ProvidersOverride = {
  auth?: Partial<React.ContextType<typeof AuthContext>>;
  event?: Partial<React.ContextType<typeof EventContext>>;
  user?: Partial<React.ContextType<typeof UserContext>>;
};

export type CustomRenderOptions = RenderOptions & {
  route?: string;
  routerProps?: Partial<MemoryRouterProps>;
  providers?: ProvidersOverride;
};

export type CustomRenderHookOptions<TProps> = RenderHookOptions<TProps> & {
  route?: string;
  routerProps?: Partial<MemoryRouterProps>;
  providers?: ProvidersOverride;
};

const createDefaultAuthValue = (): React.ContextType<typeof AuthContext> => ({
  isLoggedIn: false,
  SignIn: vi.fn().mockResolvedValue(undefined),
  SignUp: vi.fn().mockResolvedValue(undefined),
  LogOut: vi.fn(),
});

const createDefaultEventValue = (): React.ContextType<typeof EventContext> => ({
  event: {
    id: "event-1",
    name: "Cerimônia de Lua Cheia",
    description: "Uma cerimônia especial.",
    availability: 10,
    date: new Date().toISOString(),
    cover: "",
    userStatus: "OPEN",
  } as Event,
  events: [],
  eventRegistrations: [],
  eventTypes: [],
  fetchEventTypes: vi.fn().mockResolvedValue({ success: true }),
  fetchEvent: vi.fn().mockResolvedValue({ success: true }),
  fetchEvents: vi.fn().mockResolvedValue({ success: true }),
  registerUserInEvent: vi.fn().mockResolvedValue({ success: true }),
  createEvent: vi.fn().mockResolvedValue({ success: true }),
  updateEvent: vi.fn().mockResolvedValue({ success: true }),
  listEventRegistrations: vi.fn().mockResolvedValue({ success: true }),
  updateUserRegistration: vi.fn().mockResolvedValue({ success: true }),
});

const createDefaultUserValue = (): React.ContextType<typeof UserContext> => ({
  userProfile: {
    name: "Usuário Teste",
    email: "user@test.com",
    gender: "OTHER",
    rg: "123456",
    cpf: "12345678901",
    street: "Rua Teste",
    number: "123",
    neighborhood: "Bairro",
    city: "Cidade",
    state: "ST",
    zipCode: "00000000",
    cellPhone: "(11) 99999-9999",
    birth: "2000-01-01",
    role: "USER",
  } as IPersonalInformation,
  fetchUserProfile: vi.fn().mockResolvedValue(undefined),
  updateUserProfile: vi.fn().mockResolvedValue(undefined),
});

const mergeProviders = (overrides?: ProvidersOverride) => {
  const auth = { ...createDefaultAuthValue(), ...overrides?.auth };
  const event = { ...createDefaultEventValue(), ...overrides?.event };
  const user = { ...createDefaultUserValue(), ...overrides?.user };

  return { auth, event, user };
};

const Providers = ({
  children,
  overrides,
  route = "/",
  routerProps,
}: {
  children: ReactNode;
  overrides?: ProvidersOverride;
  route?: string;
  routerProps?: Partial<MemoryRouterProps>;
}) => {
  const { auth, event, user } = mergeProviders(overrides);

  return (
    <MemoryRouter initialEntries={[route]} {...routerProps}>
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={user}>
          <EventContext.Provider value={event}>
            {children}
          </EventContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", routerProps, providers, ...renderOptions }: CustomRenderOptions = {}
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <Providers route={route} routerProps={routerProps} overrides={providers}>
        {children}
      </Providers>
    ),
    ...renderOptions,
  });
};

export const renderHookWithProviders = <Result, Props>(
  callback: (props: Props) => Result,
  options?: CustomRenderHookOptions<Props>
): RenderHookResult<Result, Props> => {
  const { route = "/", providers, routerProps, ...renderHookOptions } = options ?? {};

  const wrapper = ({ children }: { children: ReactNode }) => (
    <Providers route={route} overrides={providers} routerProps={routerProps}>
      {children}
    </Providers>
  );

  return renderHook(callback, {
    wrapper,
    ...renderHookOptions,
  });
};

export const createEventRegistration = (
  overrides: Partial<EventRegistration> = {}
): EventRegistration => ({
  id: "registration-1",
  eventId: "event-1",
  userId: "user-1",
  invitedByUserId: "user-2",
  status: "RESERVED",
  name: "Participante Teste",
  email: "participante@test.com",
  gender: "OTHER",
  firstTimer: false,
  hasPaid: false,
  checkedInAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createEventType = (overrides: Partial<EventType> = {}): EventType => ({
  id: "event-type-1",
  name: "Vivência",
  ...overrides,
});

export const createEvent = (overrides: Partial<Event> = {}): Event => ({
  id: "event-1",
  name: "Vivência Xamânica",
  description: "Descrição do evento",
  availability: 20,
  date: new Date().toISOString(),
  cover: "",
  userStatus: "OPEN",
  ...overrides,
});

export const createUserProfile = (
  overrides: Partial<IPersonalInformation> = {}
): IPersonalInformation => ({
  name: "Usuário Teste",
  email: "usuario@test.com",
  gender: "OTHER",
  rg: "1234567",
  cpf: "12345678901",
  street: "Rua Teste",
  number: "123",
  neighborhood: "Bairro",
  city: "Cidade",
  state: "ST",
  zipCode: "12345000",
  cellPhone: "(11) 90000-0000",
  birth: "2000-01-01",
  role: "USER",
  ...overrides,
});
