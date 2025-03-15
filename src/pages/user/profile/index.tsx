import "./styles.css";

import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPersonalInformation, IUserDrugsHistory } from "@/pages/user/dtos";
import { DrugHistory } from "@/pages/user/profile/components/drugHistory";
import { PersonalInformation } from "@/pages/user/profile/components/personalInformation";
// import { LoadingSpinner } from "@/shared/components/LoadingSpinner"; // Example of a reusable loading component
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { api } from "@/shared/infra/api";

interface ITokenPayload {
  sub: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userDrugHistory, setUserDrugHistory] = useState<IUserDrugsHistory[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<IPersonalInformation | null>(
    null
  );

  const redirectToLogin = useCallback(() => {
    console.error("Redirecting to login.");
    navigate("/login");
  }, [navigate]);

  const getUserIdFromToken = useCallback((): string | null => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
      return null;
    }

    try {
      const { sub } = jwtDecode<ITokenPayload>(token);
      return sub;
    } catch (error) {
      console.error("Invalid token. Redirecting to login.");
      redirectToLogin();
      return null;
    }
  }, [redirectToLogin]);

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await api.get(`users/${userId}`);
      setUserProfile({ email: response.data.email, ...response.data.profile });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchDrugsHistory = useCallback(async () => {
    try {
      const response = await api.get("/profiles/drugs");
      setUserDrugHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch user drug history:", error);
    }
  }, []);

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
      fetchUserProfile();
      fetchDrugsHistory();
    }
  }, [getUserIdFromToken, fetchUserProfile, fetchDrugsHistory]);

  return (
    <LayoutWithHeader>
      <div className="profile">
        {loading ? (
          // <LoadingSpinner /> //todo create a loading component
          <p>loading...</p>
        ) : (
          <>
            {userProfile && (
              <PersonalInformation user={userProfile} userId={userId} />
            )}
            <DrugHistory userDrugHistory={userDrugHistory} />
          </>
        )}
      </div>
    </LayoutWithHeader>
  );
}
