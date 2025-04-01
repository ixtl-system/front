import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  z-index: 99;
  width: 100%;
  max-width: 80px;
  min-height: calc(100vh - 40px);
  height: max-content;
`;

export const SidebarContent = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;

  left: 0;
  top: 0;

  width: 100%;
  max-width: 80px;
  min-height: 100vh;
  padding: 55px 0 0;
  background-color: #FFF8ED;
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  gap: 24px;
  margin: 24px 0 0;
`;

export const SidebarListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: 0.4s all;

  svg {
    width: 18px;
    height: 18px;
  }

  &:is(:hover, :active, :focus) {
    background-color: #96AE8E;

    svg {
      color: #FFF !important;
    }
  }
`;