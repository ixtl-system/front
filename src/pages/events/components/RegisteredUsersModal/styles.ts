import { Modal } from "antd";
import styled, { keyframes } from "styled-components";

import { DefaultButton } from "@/shared/components/CustomStyled";

const fadeInList = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const RegisterUsersModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  top: 4vh;

  .ant-modal-content {
    border-radius: 20px;
    padding: 0;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  }

  .ant-modal-body {
    padding: 28px 32px;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  @media (max-width: 768px) {
    .ant-modal-body {
      padding: 20px 20px 24px;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SwitchBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px 0 12px;
  border-bottom: 1px solid #f1e7d8;
`;

export const SwitchButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-family: Montserrat;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  font-size: 14px;
  color: ${({ $active }) => ($active ? "#ffffff" : "#6B6B80")};
  background: ${({ $active }) => ($active ? "#96AE8E" : "#F4F4F8")};
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? "0 6px 18px rgba(150, 174, 142, 0.35)" : "none")};

  &:hover {
    background: ${({ $active }) => ($active ? "#8BA581" : "#ECEFF1")};
  }

  &:focus-visible {
    outline: 2px solid #96ae8e;
    outline-offset: 2px;
  }
`;

export const ParticipantsScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 8px 4px 4px;
`;

export const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  gap: 16px;
  padding: 8px 0 32px;
  margin: 0;
  animation: ${fadeInList} 0.25s ease;
`;

export const UserListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #f1e7d8;
  background-color: #fff;
`;

export const ParticipantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  h5 {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 16px;
    color: #0c120c;
    margin: 0 0 6px;
  }
`;

export const StatusBadge = styled.span<{ $color: string; $background: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 13px;
  color: ${({ $color }) => $color};
  background-color: ${({ $background }) => $background};
`;

export const FirstTimerTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 600;
  color: #b17710;
  background: #fff4e0;
  border-radius: 999px;
  padding: 4px 10px;

  svg {
    font-size: 14px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const CheckInButton = styled(DefaultButton)`
  background-color: #1f9254;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  min-width: 160px;
  justify-content: center;

  &:hover {
    background-color: #187746;
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background-color: #1f9254;
  }
`;

export const ActionDropdownButton = styled(DefaultButton)`
  border-radius: 999px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  color: #0c120c;
  padding: 10px 18px;
  font-size: 14px;
  gap: 8px;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background-color: #fff;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  width: 100%;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  width: 100%;

  .ant-empty-description {
    color: #6b6b80;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const BackButton = styled(DefaultButton)`
  background: none;
  color: #96ae8e;
  padding: 10px 32px;
  gap: 5px;
  border: 1px solid #96ae8e;
  border-radius: 999px;

  &:hover {
    background-color: #96ae8e;
    color: #fafafa;
  }
`;
