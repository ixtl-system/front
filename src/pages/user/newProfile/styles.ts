import { DatePicker, Input } from "antd"
import styled from "styled-components"

import { DefaultButton } from "@/shared/components/CustomStyled"

// Styled Components
export const ProfileContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  width: calc(100% - 60px);
  height: 100%;
  overflow-y: auto;
  margin: 30px;

  @media (max-width: 900px) {
    margin: 10px;
    width: calc(100% - 20px);
  }
`

export const Header = styled.div`
  margin-bottom: 24px;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 4px;
`

export const Subtitle = styled.p`
  color: #8c8c8c;
  margin: 0;
`

export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
  flex-wrap: wrap;

  @media (max-width: 470px) {
    button {
      width: 100%;
    }
  }
`

export const Tab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 50px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.active ? "#8BAF8A" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid ${(props) => (props.active ? "#8BAF8A" : "#e0e0e0")};

  &:hover {
    background-color: ${(props) => (props.active ? "#8BAF8A" : "#f5f5f5")};
  }
`

export const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-size: 14px;
  color: #8c8c8c;
`

export const StyledInput = styled(Input)`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`

export const  SaveButton = styled(DefaultButton)`
  align-self: flex-end;
  max-width: max-content;
  gap: 20px;
  background-color: #96AE8E;
  color: #FAFAFA;
  margin: 100px 0 0;
`

export const DrugHistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`