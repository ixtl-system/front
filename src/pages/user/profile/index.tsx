import "./styles.css";

import { useContext, useEffect, useState } from "react";

import { DrugHistory } from "@/pages/user/profile/DrugHistory";
import { PersonalInformation } from "@/pages/user/profile/PersonalInformation";
import { LayoutWithHeader } from "@/shared/components/templates/LayoutWithHeader";
import { UserContext } from "@/shared/context/UserContext";
import { DiseasesHistory } from "./DiseasesHistory";
import { useDiseases } from "@/shared/hooks/useDiseases";

export function Profile() {
  const { fetchUserDiseases, fetchAllDiseases } = useDiseases();
  const { fetchUserProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserProfile() {
      setLoading(true);

      await Promise.all([
        fetchUserDiseases(),
        fetchAllDiseases(),
        fetchUserProfile()
      ]);

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
            <DiseasesHistory />
          </>
        )}
      </div>
    </LayoutWithHeader>
  );
}
