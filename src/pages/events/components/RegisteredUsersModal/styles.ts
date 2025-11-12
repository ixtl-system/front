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
  top: clamp(12px, 4vh, 56px);
  width: min(1040px, calc(100vw - 32px));
  max-width: 100%;
  margin: 0 auto;
  /* left: 50% important; */
  /* transform: translateX(-50%) important; */

  .ant-modal-content {
    border-radius: 26px;
    padding: 0;
    display: flex;
    flex-direction: column;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 236, 218, 0.96) 100%);
    box-shadow: 0 36px 58px rgba(84, 70, 52, 0.18);
    min-height: min(720px, calc(100vh - 32px));
    min-height: min(720px, calc(100dvh - 32px));
    max-height: min(960px, calc(100vh - 24px));
    max-height: min(960px, calc(100dvh - 24px));
  }

  .ant-modal-body {
    padding: 32px 36px;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  @media (max-width: 1024px) {
    width: min(980px, calc(100vw - 24px));
  }

  @media (max-width: 768px) {
    top: clamp(8px, 4vh, 32px);
    width: min(720px, calc(100vw - 20px));

    .ant-modal-body {
      padding: 24px 20px 22px;
    }
  }

  @media (max-width: 480px) {
    width: calc(100vw - 16px);

    .ant-modal-body {
      padding: 20px 16px 18px;
    }
  }

  @media (max-height: 700px) {
    top: clamp(6px, 3vh, 20px);

    .ant-modal-content {
      min-height: calc(100vh - 16px);
      min-height: calc(100dvh - 16px);
      max-height: calc(100vh - 12px);
      max-height: calc(100dvh - 12px);
    }

    .ant-modal-body {
      padding: 20px 18px 16px;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
  height: 100%;
  padding-bottom: 4px;
  padding-bottom: calc(4px + env(safe-area-inset-bottom));
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 640px) {
    text-align: center;
    align-items: center;
  }
`;

export const SwitchBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 8px 0 12px;
  border-bottom: 1px solid rgba(124, 97, 70, 0.16);

  @media (max-width: 900px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileSwitchWrapper = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0 10px;
  }
`;

export const MobileSwitchLabel = styled.label`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #3d3227;
`;

export const MobileSwitchSelect = styled.select`
  width: 100%;
  border-radius: 16px;
  border: 2px solid #0c120c33;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #0c120c;
  padding: 12px 14px;
  background-color: #ffffff;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #7d7c83 50%),
    linear-gradient(135deg, #7d7c83 50%, transparent 50%);
  background-position: calc(100% - 26px) calc(50% - 3px), calc(100% - 20px) calc(50% - 3px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;

  &:focus,
  &:hover {
    border-color: #8cc356;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.12);
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 4px 0 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding-bottom: 6px;
  }

  @media (max-height: 700px) {
    padding-bottom: 6px;
  }
`;

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 240px;
  min-width: 0;

  @media (max-width: 576px) {
    flex-basis: 100%;
    gap: 6px;
  }
`;

export const FilterLabel = styled.label`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #3d3227;
  cursor: pointer;
`;

export const FilterSelect = styled.select`
  display: flex;
  width: 100%;
  padding: 13px;
  border-radius: 16px;
  border: 2px solid #0c120c33;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  color: #0c120c;
  background-color: #ffffff;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #7d7c83 50%),
    linear-gradient(135deg, #7d7c83 50%, transparent 50%);
  background-position: calc(100% - 24px) calc(50% - 3px), calc(100% - 18px) calc(50% - 3px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;

  &:focus,
  &:hover {
    border-color: #8cc356;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }

  option {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    color: #0c120c;
  }

  @media (max-width: 480px) {
    padding: 11px 12px;
  }
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;

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
  height: 100%;
  overflow-y: auto;
  padding: 8px 2px 0;
  scroll-padding-bottom: 24px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  /* Esconde visualmente a barra de rolagem, mantendo o scroll ativo */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE e Edge Legacy */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Edge moderno */
  }

  @media (max-width: 768px) {
    padding: 6px 0 0;
  }

  @media (max-height: 700px) {
    padding-top: 4px;
  }
`;

export const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  gap: 16px;
  padding: 4px 0 18px;
  margin: 0;
  animation: ${fadeInList} 0.25s ease;

  @media (max-width: 480px) {
    gap: 10px;
    padding-bottom: 16px;
  }
`;

export const UserListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px;
  border-radius: 20px;
  border: 1px solid rgba(124, 97, 70, 0.16);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 24px rgba(90, 72, 50, 0.08);

  @media (max-width: 768px) {
    padding: 18px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    padding: 16px;
  }
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
  justify-content: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
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

  @media (max-width: 640px) {
    width: 100%;
    min-width: 0;
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

  @media (max-width: 640px) {
    width: 100%;
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
  margin-top: auto;
  padding: 14px 0 4px;
  padding-bottom: 4px;
  padding-bottom: calc(4px + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(124, 97, 70, 0.16);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(248, 236, 218, 0.6) 50%, rgba(248, 236, 218, 0.92) 100%);
  position: sticky;
  bottom: 0;
`;

export const BackButton = styled(DefaultButton)`
  background: rgba(255, 255, 255, 0.85);
  color: #6f8f72;
  padding: 8px 24px;
  gap: 6px;
  border: 1px solid rgba(111, 143, 114, 0.35);
  border-radius: 999px;
  min-height: 44px;
  line-height: 1.1;

  &:hover {
    background-color: #6f8f72;
    color: #fbf5ec;
  }
`;
