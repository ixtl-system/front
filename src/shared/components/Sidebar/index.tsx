import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PiCalendarDots, PiClipboardTextLight, PiSignOut, PiUser } from "react-icons/pi";

import LogoItem from "@/assets/icon.png";
import { AuthContext } from "@/shared/context/AuthContext";
import { SidebarContainer, SidebarContent, SidebarList, SidebarListItem } from './styles';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    LogOut();
    navigate("/");
  };

  return (
    <SidebarContainer id="sidebar">
      <SidebarContent>
        <img src={LogoItem} alt="logo" onClick={() => navigate("/")} />

        <SidebarList>
          <SidebarListItem onClick={() => navigate("/profile")}>
            <div>
              <PiUser color="#96AE8E" />
            </div>

            <span>Perfil</span>
          </SidebarListItem>

          <SidebarListItem onClick={() => navigate("/events")} >
            <div>
              <PiCalendarDots color="#96AE8E" />
            </div>

            <span>Eventos</span>
          </SidebarListItem>

          <SidebarListItem>
            <div>
              <PiClipboardTextLight color="#96AE8E" />
            </div>

            <span>Indisponível</span>
          </SidebarListItem>

          <SidebarListItem onClick={handleLogOut}>
            <div>
              <PiSignOut color="#96AE8E" />
            </div>

            <span>Sair</span>
          </SidebarListItem>
        </SidebarList>
      </SidebarContent>
    </SidebarContainer>
  )
}
