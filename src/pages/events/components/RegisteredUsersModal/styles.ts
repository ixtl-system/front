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
    border-radius: 26px;
    padding: 0;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 236, 218, 0.96) 100%);
    box-shadow: 0 36px 58px rgba(84, 70, 52, 0.18);
  }

  .ant-modal-body {
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  @media (max-width: 768px) {
    .ant-modal-body {
      padding: 24px 20px 26px;
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
  border-bottom: 1px solid rgba(124, 97, 70, 0.16);
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

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(111, 143, 114, 0.35);
    border-radius: 999px;
  }
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
  padding: 22px;
  border-radius: 20px;
  border: 1px solid rgba(124, 97, 70, 0.16);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 24px rgba(90, 72, 50, 0.08);
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
  background-color: #4c7d58;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 12px 22px rgba(76, 125, 88, 0.32);

  &:hover {
    background-color: #3f6b4a;
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #4c7d58;
    box-shadow: none;
  }
`;

export const ActionDropdownButton = styled(DefaultButton)`
  border-radius: 999px;
  border: 1px solid rgba(124, 97, 70, 0.22);
  background-color: rgba(255, 255, 255, 0.92);
  color: #3d3227;
  padding: 10px 18px;
  font-size: 14px;
  gap: 8px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s ease;

  &:hover {
    background-color: rgba(244, 232, 214, 0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: rgba(255, 255, 255, 0.92);
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
  background: rgba(255, 255, 255, 0.85);
  color: #6f8f72;
  padding: 10px 28px;
  gap: 6px;
  border: 1px solid rgba(111, 143, 114, 0.35);
  border-radius: 999px;

  &:hover {
    background-color: #6f8f72;
    color: #fbf5ec;
  }
`;
