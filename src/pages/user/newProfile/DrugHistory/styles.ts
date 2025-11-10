import { Button } from "antd"
import styled from "styled-components"

export const DrugHistoryContainer = styled.div`
  padding: 20px 0;
  border-radius: 8px;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
`

export const DrugGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 32px;
  row-gap: 40px;
  margin-bottom: 30px;
`

export const DrugSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DrugTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`

export const FrequencyLabel = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0 0 5px 0;
`

export const SelectWrapper = styled.div`
 
`

export const SelectContainer = styled.div`
  margin-bottom: 15px;
`

export const SaveButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: 100px;
  background-color: #8baa88;
  border: none;
  float: right;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  
  &:hover, &:focus {
    background-color: #7a9977;
  }
  
  svg {
    margin-right: 5px;
  }
`
