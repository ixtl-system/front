import styled from "styled-components";

export const DiseasesHistoryContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  
  h1 {
    margin: 0;
    font-size: 28px;
    text-align: center;
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

  .user-diseases-history {
    margin: 40px 0 20px;

    > button {
      width: 100%;
    }

    section {
      display: flex;
      gap: 20px;

      .ant-select {
        width: 400px;
      }

      button {
        width: 200px;
      }
    }

    ul {
      list-style: none;
      padding: 20px 0;

      li {
        padding: 5px 0;
      }
    }
  }

`