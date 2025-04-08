import { Modal } from "antd";
import styled from "styled-components";

export const CustomModalContainer = styled(Modal)`
  && {
    top: 0;
    margin: 0;
    padding: 0;
    max-width: 100vw;
    
    .ant-modal-content {
      width: 100vw;
      height: 100vh;
      padding: 0;
      margin: 0;
      border-radius: 0;
    }
    
    .ant-modal-body {
      height: 100%;
      padding: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 120px 20px;

      img {
        width: 60px;
        height: 60px;
      }
    }
    
    .ant-modal-close {
      top: 24px;
      right: 24px;
      z-index: 1001;
    }
  }
  `;

export const CustomList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
`;

export const CustomListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 20px;
  }

  span {
    font-family: Montserrat;
    font-size: 16px;
  }

`;