import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { vi } from "vitest";

import { AuthContext } from "@/shared/context/AuthContext";
import { DiseasesContext } from "@/shared/context/DiseasesContext";
import { EventContext } from "@/shared/context/EventContext";
import { ProfileContext } from "@/shared/context/Profile";
import { SurgeryContext } from "@/shared/context/SurgeryContext";
import { UserContext } from "@/shared/context/UserContext";
import { Event } from "@/shared/types/Event";
import { IDisease, IUserDiseases, IUserDiseasesAndMedications } from "@/shared/types/Diseases";
import { IMedication, IUserMedication } from "@/shared/types/Medication";
import { IDrug } from "@/shared/types/Drug";
import { IPersonalInformation } from "@/pages/user/dtos";
import { ICreateSurgeryParams, IUserSurgery } from "@/shared/types/Surgery";

export interface ProviderOverrides {
  router?: MemoryRouterProps;
  auth?: Partial<React.ContextType<typeof AuthContext>>;
  event?: Partial<React.ContextType<typeof EventContext>>;
  user?: Partial<React.ContextType<typeof UserContext>>;
  diseases?: Partial<React.ContextType<typeof DiseasesContext>>;
  surgery?: Partial<React.ContextType<typeof SurgeryContext>>;
  profile?: Partial<React.ContextType<typeof ProfileContext>>;
}

const defaultEvent: Event = {
  id: "event-id",
  name: "Evento de teste",
  description: "Descrição",
  availability: 10,
  date: new Date().toISOString(),
  cover: "",
  userStatus: "OPEN",
};

const defaultPersonalInformation: IPersonalInformation = {
  name: "Usuário",
  email: "user@example.com",
  gender: "OTHER",
  rg: "12345678",
  cpf: "12345678901",
  street: "Rua",
  number: "123",
  neighborhood: "Bairro",
  city: "Cidade",
  state: "SP",
  zipCode: "01001000",
  phone: "11999999999",
  cellPhone: "11999999999",
  passport: "AB123456",
  birth: "2000-01-01",
  role: "USER",
};

const noop = () => Promise.resolve({ success: true });
const asyncVoid = () => Promise.resolve();

const defaultEventContext: React.ContextType<typeof EventContext> = {
  event: defaultEvent,
  events: [defaultEvent],
  eventRegistrations: [],
  eventTypes: [],
  fetchEventTypes: noop,
  fetchEvent: noop,
  fetchEvents: noop,
  registerUserInEvent: noop,
  createEvent: noop,
  updateEvent: noop,
  listEventRegistrations: noop,
  updateUserRegistration: () => Promise.resolve({ success: true }),
};

const defaultAuthContext: React.ContextType<typeof AuthContext> = {
  isLoggedIn: false,
  SignIn: vi.fn(),
  SignUp: vi.fn(),
  LogOut: vi.fn(),
};

const defaultUserContext: React.ContextType<typeof UserContext> = {
  userProfile: defaultPersonalInformation,
  fetchUserProfile: asyncVoid,
  updateUserProfile: asyncVoid,
};

const defaultDiseasesContext: React.ContextType<typeof DiseasesContext> = {
  allDiseases: [] as IDisease[],
  userDiseases: [] as IUserDiseases[],
  userMedications: [] as IUserMedication[],
  userDiseasesAndMedications: [] as IUserDiseasesAndMedications[],
  medicationsList: [] as IMedication[],
  fetchMedicationsList: asyncVoid,
  fetchAllDiseases: asyncVoid,
  fetchUserDiseases: asyncVoid,
  fetchUserMedications: asyncVoid,
  removeUserDisease: () => Promise.resolve({ success: true }),
  removeUserMedication: () => Promise.resolve({ success: true }),
  createUserDisease: asyncVoid,
  createUserMedication: asyncVoid,
  getUserDiseasesAndMedications: asyncVoid,
};

const defaultSurgeryContext: React.ContextType<typeof SurgeryContext> = {
  userSurgeries: [] as IUserSurgery[],
  fetchUserSurgeries: asyncVoid,
  createUserSurgery: async (_props: ICreateSurgeryParams) => Promise.resolve(),
};

const defaultProfileContext: React.ContextType<typeof ProfileContext> = {
  updateDrugHistory: async (_params: IDrug[]) => Promise.resolve(),
  fetchDrugs: asyncVoid,
  drugs: [] as IDrug[],
  setDrugs: vi.fn(),
};

function mergeContext<T>(base: T, overrides?: Partial<T>): T {
  return { ...base, ...(overrides ?? {}) };
}

type RenderWithProvidersOptions = RenderOptions & {
  providerOverrides?: ProviderOverrides;
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
};

export function renderWithProviders(
  ui: ReactElement,
  { providerOverrides, ...renderOptions }: RenderWithProvidersOptions = {},
) {
  const routerProps: MemoryRouterProps = providerOverrides?.router ?? { initialEntries: ["/"] };

  const authValue = mergeContext(defaultAuthContext, providerOverrides?.auth);
  const eventValue = mergeContext(defaultEventContext, providerOverrides?.event);
  const userValue = mergeContext(defaultUserContext, providerOverrides?.user);
  const diseasesValue = mergeContext(defaultDiseasesContext, providerOverrides?.diseases);
  const surgeryValue = mergeContext(defaultSurgeryContext, providerOverrides?.surgery);
  const profileValue = mergeContext(defaultProfileContext, providerOverrides?.profile);

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter {...routerProps}>
      <AuthContext.Provider value={authValue}>
        <ProfileContext.Provider value={profileValue}>
          <UserContext.Provider value={userValue}>
            <EventContext.Provider value={eventValue}>
              <DiseasesContext.Provider value={diseasesValue}>
                <SurgeryContext.Provider value={surgeryValue}>
                  {children}
                </SurgeryContext.Provider>
              </DiseasesContext.Provider>
            </EventContext.Provider>
          </UserContext.Provider>
        </ProfileContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderHookWithProviders<T>(callback: () => T, providerOverrides?: ProviderOverrides) {
  let resultValue: T | undefined;

  function TestComponent() {
    resultValue = callback();
    return null;
  }

  renderWithProviders(<TestComponent />, { providerOverrides });

  if (resultValue === undefined) {
    throw new Error("renderHookWithProviders did not capture a value");
  }

  return { result: { current: resultValue } };
}

export type RenderWithProvidersReturn = ReturnType<typeof renderWithProviders>;
