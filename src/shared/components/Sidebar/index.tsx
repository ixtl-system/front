import LogoItem from "@/assets/icon.png"
import { SidebarContainer, SidebarContent, SidebarList, SidebarListItem } from './styles'
import { PiCalendarDots, PiClipboardTextLight, PiSignOut, PiUser } from "react-icons/pi"

export const Sidebar = () => {
  return (
    <SidebarContainer id="sidebar">
      <SidebarContent>
        <img src={LogoItem} alt="logo" />

        <SidebarList>
          <SidebarListItem>
            <PiUser color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem>
            <PiCalendarDots color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem>
            <PiClipboardTextLight color="#96AE8E" />
          </SidebarListItem>

          <SidebarListItem>
            <PiSignOut color="#96AE8E" />
          </SidebarListItem>
        </SidebarList>
      </SidebarContent>
    </SidebarContainer>
  )
}
