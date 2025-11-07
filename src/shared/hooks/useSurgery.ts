import { useContext } from "react";

import { SurgeryContext } from "../context/SurgeryContext";

export const useSurgery = () => useContext(SurgeryContext);
