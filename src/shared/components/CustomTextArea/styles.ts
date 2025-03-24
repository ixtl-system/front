import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  display: flex;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  width: 100%;
  outline: none;
  
  transition: 0.4s all;
  font-family: Roboto;

  &::placeholder {
    color: #b9b9b9;
  }

  &:is(:focus, :hover) {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5,145,255,0.1);
  }
`;