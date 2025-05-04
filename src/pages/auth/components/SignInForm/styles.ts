import styled from "styled-components";

export const SignInFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-family: Montserrat;
    font-weight: 700;
    font-size: 28px;
    color: #96AE8E;
    margin: 45px 0 10px;
    text-align: center;
  }

  p {
    font-family: Montserrat;
    font-weight: 500;
    font-size: 14px;
  }

  p.subtitle {
    color: #7D7C83;
    margin: 0 0 40px;
  }

  form p {
    color: var(--red-500);
    margin: 5px 5px 10px;
  }

  .login-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    gap: 5px;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

