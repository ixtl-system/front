import { Modal } from "antd";
import styled from "styled-components";

import { DefaultButton } from "@/shared/components/CustomStyled";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 24px;
    padding: 28px 30px 34px;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 236, 218, 0.96) 100%);
    box-shadow: 0 28px 48px rgba(84, 70, 52, 0.18);
  }

  .ant-modal-header {
    margin-bottom: 12px;
    border-bottom: none;
    background: transparent;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-footer {
    border-top: none;
    padding: 20px 0 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

export const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(111, 143, 114, 0.12);
  color: #4c4c4c;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
`;

export const SwitchLabel = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;

  small {
    font-size: 12px;
    font-weight: 500;
    color: #6f8f72;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
`;

export const BackButton = styled(DefaultButton)`
  background: rgba(255, 255, 255, 0.85);
  color: #6f8f72;
  padding: 12px 28px;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid rgba(111, 143, 114, 0.35);
  font-family: "Montserrat", sans-serif;
  font-weight: 600;

  &:hover {
    background-color: #6f8f72;
    color: #fbf5ec;
  }
`;

export const SubmitButton = styled(DefaultButton)`
  background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
  color: #fbf5ec;
  gap: 10px;
  border-radius: 999px;
  font-weight: 700;
  padding: 12px 32px;
  box-shadow: 0 16px 30px rgba(99, 130, 103, 0.24);

  &:hover {
    background: linear-gradient(135deg, #5f7e63 0%, #4f6d53 100%);
    color: #fbf5ec;
  }

  &[disabled] {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const StatusPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(111, 143, 114, 0.25);
  font-family: "Montserrat", sans-serif;
`;

export const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  background: rgba(111, 143, 114, 0.16);
  color: #4f6d53;
`;
