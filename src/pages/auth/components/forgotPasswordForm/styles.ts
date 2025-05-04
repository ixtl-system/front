import styled from "styled-components";

export const ForgotPasswordFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .login-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap: 5px;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`
