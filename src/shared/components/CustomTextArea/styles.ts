import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  display: flex;
  padding: 13px;
  border-radius: 16px;
  border: 2px solid #0C120C33;
  width: 100%;
  outline: none;
  
  transition: 0.4s all;

  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  outline: none;

  &::placeholder {
    color: #b9b9b9;
  }

  &:is(:focus, :hover) {
    border-color: #8cc356;
    box-shadow: 0 0 0 2px rgba(5,145,255,0.1);
  }
`;