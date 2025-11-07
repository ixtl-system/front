import { DatePicker, Modal } from "antd";
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

  .ant-select,
  form input[name="availability"] {
    max-width: 426px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-top: 48px;
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

export const SaveButton = styled(DefaultButton)`
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
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  max-width: 426px;
  padding: 13px;
  border-radius: 18px;
  border: 1px solid rgba(47, 42, 31, 0.18);
  background-color: rgba(255, 255, 255, 0.9);

  .ant-picker-input input {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 14px !important;
    letter-spacing: 0%;
    outline: none;
    color: #574d3f;
  }

  .ant-picker-suffix {
    color: #8c8c8c;
  }
`;
