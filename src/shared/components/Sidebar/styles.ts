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
  align-items: flex-start;
  padding: 55px 16px 0;
  flex-direction: column;
  position: fixed;

  left: 0;
  top: 0;

  width: 100%;
  max-width: 80px;
  min-height: 100vh;
  background-color: #FFF8ED;

  ul li span  {
    display: none;
    font-family: Montserrat;

  }

  &, ul li span  {
    transition: 0.4s all;
  }

  &:hover {
    max-width: 200px;

    ul li span {
      display: flex;
    }
  }
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

export const SidebarListItem = styled.li`
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
    transition: 0.4s all;

    width: 40px;
    height: 40px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &:is(:hover, :active, :focus) {
    div {
      background-color: #96AE8E;
    }

    svg {
      color: #FFF !important;
    }
  }
`;