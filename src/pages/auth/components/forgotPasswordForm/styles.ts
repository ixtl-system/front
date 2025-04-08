import styled from "styled-components";

export const ForgotPasswordFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: 20px 0 0;
  }

  button, .login-options {
    margin: 10px 0 0;
  }

  .login-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap: 5px;
  }

  .login-options button {
    background: none;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0 30px;
  }
`
