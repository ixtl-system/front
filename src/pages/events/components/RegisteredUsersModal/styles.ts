
import { DefaultButton } from "@/shared/components/CustomStyled";
import { EventStatus } from "@/shared/types/Event";
import { Modal } from "antd";
import styled, { css } from "styled-components";

export const RegisterUsersModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  
  .ant-modal-content {
    border-radius: 12px;
    padding: 24px;
  }
  
  .ant-modal-header {
    margin-bottom: 8px;
  }
  
  .ant-modal-body {
    padding: 0;
  }
  
  .ant-modal-footer {
    border-top: none;
    padding: 16px 0 0;
  }

  .ant-empty-image {
    margin: 80px 0 0;
  }
`

export const ModalContent = styled.div``
export const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  gap: 16px;
  padding: 0 0 50px 0;

  max-height: 400px;
  overflow-y: auto;
`

interface IUserListItemProps {
  $status: EventStatus;
}

export const UserListItem = styled.li<IUserListItemProps>`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border-radius: 16px;
  margin-right: 10px;

  h5 {
    display: flex;
    align-items: center;
    gap: 18px;

    font-family: Montserrat;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0%;
    color: #7D7C83;

    svg {
      font-size: 20px;
    }
  }

  ${({ $status }) => $status === "CANCELED" ? css`
    background-color: #E469621A;
    border: none;
    
    .status span {
      font-weight: 700;
      color: #E46962;
    }
  ` : $status === "CONFIRMED" ? css`
    background-color: #FFF8ED;
    border: none;
    
    .status span {


      font-weight: 700;
      color: #96AE8E;
    }
  ` : css`
    border: 2px solid #FFF8ED;
  ` };

  .status {
    display: flex;
    align-items: center;
    gap: 18px;

    span {
      font-family: Montserrat;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0%;
    }

    svg {
      font-size: 18px
    }
  }

  .approve-control {
    button {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      letter-spacing: 0%;
      border: none;
      background: #96AE8E;
      border-radius: 16px;
      padding: 5px 10px;

      & + button {
        background: #E46962;
        margin-left: 10px;
      }
    }
  }

`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`

export const BackButton = styled(DefaultButton)`
  background: none;
  color: #96AE8E;
  padding: 10px 32px;
  gap: 5px;
  
  &:hover {
    background-color: #96AE8E;
    color: #FAFAFA
  }
`