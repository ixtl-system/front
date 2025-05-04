import styled from "styled-components";

export const SignContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 0 60px;
  background-color: #FFF8ED;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 540px;
    height: 100vh;
    min-height: 640px;
    max-height: max-content;
    padding: 40px 70px 45px;
    border-radius: 32px;
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      max-width: 145px;
      max-height: 145px;
    }

    form.form {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        margin: 0 0 10px;
      }
    }
  }

  .content .background {
    width: 50%;
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 550px) {
    padding: 0;

    .content {
      height: 100vh;
      max-height: unset;
      padding: 80px 30px 0;
      border-radius: 0;
    }
  }

  @media (max-width: 1000px) {
    .content .background {
      display: none;
    }
  }
`;

export const SignInButton = styled.button`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #FFF8ED;
  background-color:#96AE8E;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 16px;
  padding: 13px 0;
  margin: 50px 0 15px;
  cursor: pointer;
`;

export const OptionsButton = styled.button`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  text-align: center;
  color: #7D7C83;
`;

export const Title = styled.h1`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 28px;
  color: #96AE8E;
  margin: 45px 0 10px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;    
  color: #7D7C83;
  margin: 0 0 40px;
`;

export const ErrorMessage = styled.p`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;    
  color: var(--red-500);
  margin: 5px 5px 10px;
`;