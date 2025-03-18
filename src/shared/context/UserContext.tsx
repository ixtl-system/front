import { IPersonalInformation } from "@/pages/user/dtos";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useState } from "react";
import { api } from "../infra/api";
import { message } from "antd";
import cleanString from "../utils/cleanString";

export type UserContextData = {
  children: ReactNode;
};

type UserContextProps = {
  userProfile: IPersonalInformation;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (data: IPersonalInformation) => Promise<void>;
};

interface ITokenPayload {
  sub: string;
}

export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: UserContextData) {
  const [userProfile, setUserProfile] = useState<IPersonalInformation>({} as IPersonalInformation);

  function retrieveTokenFromStorage() {
    const token = localStorage.getItem("token");
    if (!token) return window.open("/login", "_self");

    const { sub } = jwtDecode<ITokenPayload>(token);
    return sub;
  }

  async function fetchUserProfile() {
    try {
      const id = retrieveTokenFromStorage();

      const { data } = await api.get(`users/${id}`);
      setUserProfile({ email: data.email, ...data.profile });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  async function updateUserProfile(data: IPersonalInformation) {
    try {
      const user = userProfile;
      const id = retrieveTokenFromStorage();
      const request = { ...data, cpf: cleanString(data.cpf), rg: cleanString(data.rg) }

      if (user?.name) {
        await api.put(`users/profiles/${id}`, request);
        message.success("ATUALIZADO!");
      } else {
        await api.post("users/profiles", request);
      }
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  }

  return (
    <UserContext.Provider value={{
      userProfile,
      fetchUserProfile,
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
}
