import { useContext } from "react";
import { PiCalendarDots, PiClipboardTextLight, PiSignOut, PiUser } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import LogoItem from "@/assets/icon.png";
import { AuthContext } from "@/shared/context/AuthContext";

import { CustomList, CustomListItem, CustomModalContainer } from "./styles"

interface MobileMenuModalProps {
  visible: boolean
  onClose: () => void
}

export const MobileMenu = ({ visible, onClose }: MobileMenuModalProps) => {
  const navigate = useNavigate();
  const { LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    LogOut();
    handleNavigateTo("/");
  };

  const handleNavigateTo = (screen: string) => {
    navigate(screen);
    onClose();
  }

  return (
    <CustomModalContainer open={visible} onClose={onClose} footer={false} onCancel={onClose}>
      <img src={LogoItem} alt="logo" onClick={() => handleNavigateTo("/")} />

      <CustomList>
        <CustomListItem onClick={() => handleNavigateTo("/profile")}>
          <PiUser color="#96AE8E" />

          <span>Perfil</span>
        </CustomListItem>

        <CustomListItem onClick={() => handleNavigateTo("/events")}>
          <PiCalendarDots color="#96AE8E" />

          <span>Eventos</span>
        </CustomListItem>

        <CustomListItem>
          <PiClipboardTextLight color="#96AE8E" />

          <span>Indisponível</span>
        </CustomListItem>

        <CustomListItem onClick={handleLogOut}>
          <PiSignOut color="#96AE8E" />

          <span>Sair</span>
        </CustomListItem>
      </CustomList>

    </CustomModalContainer >
  )
}