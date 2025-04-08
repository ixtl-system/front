import { useState } from "react";
import { PiList } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import LogoItem from "@/assets/icon.png";
import { TopbarContainer } from './styles'
import { MobileMenu } from "../MobileMenu";

export const Topbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const toggleMobileMenuVisibility = () => {
    setVisible(!visible)
  }

  return (
    <TopbarContainer>
      <img src={LogoItem} alt="logo" onClick={() => navigate("/")} />

      <button onClick={toggleMobileMenuVisibility}>
        <PiList />
      </button>

      <MobileMenu visible={visible} onClose={toggleMobileMenuVisibility} />
    </TopbarContainer>
  )
}
