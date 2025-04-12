import styled from "styled-components";

interface ISidebarProps {
  $isCollapsed?:boolean;
}

export const SidebarContainer = styled.div<ISidebarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  z-index: 99;
  width: ${({ $isCollapsed }) => $isCollapsed ? '280px' : '80px'};
  transition: 0.4s width;
`;

export const SidebarContent = styled.section<ISidebarProps>`
  display: flex;
  align-items: flex-start;
  padding: 55px 16px 0;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;
  background-color: #FFF8ED;

  height: max-content;
  min-height: 100vh;
  width: ${({ $isCollapsed }) => $isCollapsed ? '250px' : '80px'};

  transition: 0.4s width;
  position: fixed;
  left: 0;
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  gap: 24px;
  margin: 24px 0 0;
  padding: 0 4px;
`;

export const SidebarListItem = styled.li<ISidebarProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  gap: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    width: 40px;
    height: 40px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  width: ${({ $isCollapsed }) => $isCollapsed ? '100%' : 'fit-content'};
  transition: 0.4s all;

  span {
    font-family: Montserrat;
    opacity: ${({ $isCollapsed }) => $isCollapsed ? '1' : '0'};    
    animation: appears 0.6s forwards;
  }

  &:is(:hover, :active, :focus) {
    div {
      background-color: #96AE8E;
    }

    svg {
      color: #FFF !important;
    }
  }

  @keyframes appears {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;