
import { Modal, Input, DatePicker, Button } from "antd";
import styled from "styled-components";

export const { TextArea } = Input;

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
`

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
`

export const Subtitle = styled.p`
  color: #8c8c8c;
  font-size: 14px;
  margin-bottom: 24px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`

export const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
  height: 40px;
  
  &:hover {
    border-color: #d9d9d9;
    color: #595959;
  }
`

export const SaveButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #8bc34a;
  border: none;
  padding: 0 16px;
  height: 40px;
  
  &:hover {
    background-color: #7cb342;
  }
`

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  
  .ant-picker-suffix {
    color: #8c8c8c;
  }
`;