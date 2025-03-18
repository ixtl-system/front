import "./styles.css";

import { useContext, useEffect, useState } from "react";

import { DrugHistory } from "@/pages/user/profile/DrugHistory";
import { PersonalInformation } from "@/pages/user/profile/PersonalInformation";
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { UserContext } from "@/shared/context/UserContext";

export function Profile() {
  const { fetchUserProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserProfile() {
      setLoading(true);
      await fetchUserProfile();
      setLoading(false);
    }

    getUserProfile();
  }, []);

  return (
    <LayoutWithHeader>
      <div className="profile">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <PersonalInformation />
            <DrugHistory />
          </>
        )}
      </div>
    </LayoutWithHeader>
  );
}
