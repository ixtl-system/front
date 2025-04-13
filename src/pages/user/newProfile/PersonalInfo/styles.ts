import styled from "styled-components";

export const PersonalInfoContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .ant-picker {
    padding: 11px 13px;
    width: 100%;
    border-radius: 16px;
    border: 2px solid #0C120C33;

    input {
      font-family: Montserrat;
      font-weight: 500;
      font-size: 14px;
    }
  }

  section {
    display: flex;
    gap: 32px;

    > div {
      width: 100%;

      p {
        font-family: Montserrat;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0%;
        color: #7D7C8380;
        margin: 0 0 10px;
      }
    }

    .ant-input {
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

    }

    &:nth-child(5) {
      div:nth-child(2),
      div:nth-child(5) {
        width: 100%;
        max-width: 128px;

        input {
          text-align: center;
        }
      }
    }

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
`;