import styled from "styled-components";

export const UserProfileFormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;

  h1 {
    margin: 0;
    font-size: 28px;
    text-align: center;
    color: #333333;
  }

  form button {
    margin: 20px 0 0;
  }

  .user-profile p {
    margin: 10px 0 5px;
    font-size: 14px;
    color: #555555;
  }

  span.error {
    display: flex;
    font-size: 14px;
    color: #e91e63;
    margin: 5px 0;
  }

  .toggle-container {
    display: grid;
    align-items: center;
    grid-template-columns: 50px 1fr 50px;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`