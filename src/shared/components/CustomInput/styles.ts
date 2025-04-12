import styled from "styled-components";

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  span {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0%;
    color: #7D7C8380;
    margin: 0 0 10px;
  }
`;

export const StyledInput = styled.input`
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