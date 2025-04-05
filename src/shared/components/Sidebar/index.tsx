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
            <PiUser color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem onClick={() => navigate("/events")} >
            <PiCalendarDots color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem>
            <PiClipboardTextLight color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem onClick={handleLogOut}>
            <PiSignOut color="#96AE8E" />
          </SidebarListItem>
        </SidebarList>
      </SidebarContent>
    </SidebarContainer>
  )
}
