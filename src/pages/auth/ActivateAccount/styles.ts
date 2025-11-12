import { Modal } from "antd";
import styled from "styled-components";

export const ActivationContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  padding: 48px 16px;
  background: linear-gradient(185deg, #fff7ec 0%, #f5ecde 45%, #f2e5d6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActivationCard = styled.section`
  width: 100%;
  max-width: 520px;
  padding: 48px 40px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 26px 52px rgba(84, 70, 52, 0.16);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .eyebrow {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #8e6c4a;
  }

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #2f2a1f;
    margin: 0;
  }

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: #5a5245;
    margin: 0;
    line-height: 1.6;
  }
`;

export const SupportText = styled.p`
  font-size: 14px;
  color: #7d7c83;
  margin-top: 8px;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 26px;
    padding: 40px 36px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 236, 218, 0.98) 100%);
    box-shadow: 0 28px 48px rgba(84, 70, 52, 0.18);
  }

  .ant-modal-body {
    padding: 0;
  }
`;

export const ModalTitle = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #2f2a1f;
  text-align: center;
  margin-bottom: 12px;
`;

export const ModalMessage = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #5a5245;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.6;
`;

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

export const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 12px 28px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;

  color: ${({ $variant }) => ($variant === "secondary" ? "#4f5a48" : "#fbf5ec")};
  background: ${({ $variant }) =>
    $variant === "secondary"
      ? "rgba(255, 255, 255, 0.65)"
      : "linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%)"};
  border: ${({ $variant }) => ($variant === "secondary" ? "1px solid rgba(111, 143, 114, 0.35)" : "none")};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $variant }) =>
      $variant === "secondary" ? "0 8px 20px rgba(111, 143, 114, 0.18)" : "0 12px 22px rgba(102, 133, 107, 0.28)"};
  }

  &:active {
    transform: translateY(0);
  }
`;
