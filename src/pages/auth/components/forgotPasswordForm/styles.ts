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
    justify-content: space-between;
  }

  .login-options button {
    background: none;
  }

  @media screen and (max-width: 1000px) {
    .forgot-password-form-container {
      width: 100%;
    }
  }
`
