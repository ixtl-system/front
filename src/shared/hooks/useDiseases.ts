import { useContext } from "react";

import { DiseasesContext } from "../context/DiseasesContext";

export const useDiseases = () => useContext(DiseasesContext);
