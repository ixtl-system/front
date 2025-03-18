import "./styles.css";

import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPersonalInformation } from "@/pages/user/dtos";
import { DrugHistory } from "@/pages/user/profile/DrugHistory";
import { PersonalInformation } from "@/pages/user/profile/PersonalInformation";
// import { LoadingSpinner } from "@/shared/components/LoadingSpinner"; // Example of a reusable loading component
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { api } from "@/shared/infra/api";

interface ITokenPayload {
  sub: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<IPersonalInformation | null>(
    null
  );

  const redirectToLogin = useCallback(() => {
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

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
      fetchUserProfile();
    }
  }, [getUserIdFromToken, fetchUserProfile]);

  return (
    <LayoutWithHeader>
      <div className="profile">
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            {userProfile && (
              <PersonalInformation user={userProfile} userId={userId} />
            )}
            <DrugHistory />
          </>
        )}
      </div>
    </LayoutWithHeader>
  );
}
