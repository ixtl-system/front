
import { DefaultButton } from "@/shared/components/CustomStyled";
import { Modal, DatePicker } from "antd";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
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

  form input[name="availability"] {
    max-width: 426px;
  }
`
export const ButtonContainer = styled.div`
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

export const SaveButton = styled(DefaultButton)`
  background-color: #96AE8E;
  color: #FAFAFA;
  gap: 10px;
  
  &:hover {
    background-color: #fff;
    color: #96AE8E
  }
`

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  max-width: 426px;
  padding: 13px;
  border-radius: 16px;
  border: 2px solid #0C120C33;

  .ant-picker-input input {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px !important;
    letter-spacing: 0%;
    outline: none;
  }

  .ant-picker-suffix {
    color: #8c8c8c;
  }
`;