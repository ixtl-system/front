import { Select } from "antd"
import styled from "styled-components"

import { DefaultButton } from "@/shared/components/CustomStyled"

export const DiseasesContainer = styled.div`
  font-family: 'Montserrat', sans-serif;

  h3 {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 16px;
    color: #000;
  }

  form {
    margin: 0 0 60px;
  }

  .ant-select-selection-item {
    text-transform: capitalize;
  }
`

export const FormRow = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;

  p {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    color: #7D7C8380;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 288px;

  margin: 20px 0 0;
`

export const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`

export const AddButton = styled(DefaultButton)`
  max-width: max-content;
  height: max-content;
  margin: 40px 0 0;
  gap: 20px;
  background-color: #96AE8E;
  color: #FAFAFA;
`

export const DiseaseItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid #FFF8ED;
  margin: 20px 0 0;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  strong {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 14px;
    color: #7D7C83;
  }

  p, button {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    color: #7D7C83;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 10px;
    
    button {
      display: flex;
      align-items: center;
      gap: 2.5px;

      background: none;
      border: none;
      padding: 0;

      svg {
        display: none;
        margin-top: 1.5px;
      }

      &:hover {
        color: #e57373;
        cursor: pointer;

        svg {
          display: block;
        }
      }
    }
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  button {
    background: none;
    border: none;
    color: #e57373;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 288px;
  
  .ant-select-arrow {
    top: 25px;
  }
`

export const FrequencyLabel = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0 0 5px 0;
`
