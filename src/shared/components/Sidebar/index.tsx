import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiCalendarDots, PiClipboardTextLight, PiSignOut, PiUser } from "react-icons/pi";

import LogoItem from "@/assets/icon.png";
import { AuthContext } from "@/shared/context/AuthContext";
import { SidebarContainer, SidebarContent, SidebarList, SidebarListItem } from './styles';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { LogOut } = useContext(AuthContext);
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);

  const handleLogOut = () => {
    LogOut();
    navigate("/");
  };

  return (
    <SidebarContainer id="sidebar" onMouseEnter={() => setSidebarIsCollapsed(true)} onMouseLeave={() => setSidebarIsCollapsed(false)} $isCollapsed={sidebarIsCollapsed}>
      <SidebarContent>
        <img src={LogoItem} alt="logo" onClick={() => navigate("/")} />

        <SidebarList>
          <SidebarListItem onClick={() => navigate("/profile")} $isCollapsed={sidebarIsCollapsed}>
            <div>
              <PiUser color="#96AE8E" />
            </div>

            {sidebarIsCollapsed && <span>Perfil</span>}
          </SidebarListItem>

          <SidebarListItem onClick={() => navigate("/events")} $isCollapsed={sidebarIsCollapsed}>
            <div>
              <PiCalendarDots color="#96AE8E" />
            </div>

            {sidebarIsCollapsed && <span>Eventos</span>}
          </SidebarListItem>

          <SidebarListItem $isCollapsed={sidebarIsCollapsed}>
            <div>
              <PiClipboardTextLight color="#96AE8E" />
            </div>

            {sidebarIsCollapsed && <span>Indisponível</span>}
          </SidebarListItem>

          <SidebarListItem onClick={handleLogOut} $isCollapsed={sidebarIsCollapsed}>
            <div>
              <PiSignOut color="#96AE8E" />
            </div>

            {sidebarIsCollapsed && <span>Sair</span>}
          </SidebarListItem>
        </SidebarList>
      </SidebarContent>
    </SidebarContainer>
  )
}
