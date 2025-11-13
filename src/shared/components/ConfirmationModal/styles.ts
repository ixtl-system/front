import styled, { keyframes } from "styled-components";

import { DefaultButton } from "@/shared/components/CustomStyled";

const overlayFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(34, 26, 20, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1200;
  animation: ${overlayFade} 180ms ease forwards;
`;

export const ModalBody = styled.div`
  width: min(520px, 100%);
  border-radius: 36px;
  padding: 40px 44px 36px;
  background: linear-gradient(160deg, rgba(255, 247, 236, 0.96) 0%, rgba(242, 229, 213, 0.95) 55%, rgba(237, 220, 199, 0.97) 100%);
  box-shadow: 0 24px 40px rgba(79, 64, 46, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: ${modalEnter} 220ms ease forwards;
  font-family: "Montserrat", sans-serif;
  color: #3d3227;

  @media (max-width: 480px) {
    padding: 32px 26px 30px;
    border-radius: 28px;
  }
`;

export const ModalTitle = styled.h2`
  font-weight: 700;
  font-size: clamp(22px, 4vw, 28px);
  line-height: 1.2;
  margin: 0;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.6;
  color: #5f5345;
  margin: 0;
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 12px;
`;

export const SecondaryButton = styled(DefaultButton)`
  flex: 1 1 160px;
  justify-content: center;
  border: 1px solid rgba(111, 143, 114, 0.45);
  background: rgba(255, 255, 255, 0.85);
  color: #6f8f72;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 20px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
    color: #fbf5ec;
    transform: translateY(-1px);
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  flex: 1 1 160px;
  justify-content: center;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #fbf5ec;
  background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
  box-shadow: 0 16px 30px rgba(99, 130, 103, 0.28);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #5f7e63 0%, #4f6d53 100%);
    transform: translateY(-1px);
    box-shadow: 0 18px 34px rgba(79, 64, 46, 0.26);
  }
`;
