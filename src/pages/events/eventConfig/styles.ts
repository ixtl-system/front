import styled from "styled-components";

export const EventConfigContainer = styled.div` 
  display: flex;
  width: 100%;
  height: calc(100vh - 77px);
  justify-content: center;
  padding: 40px 0;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    height: 100%;

    h2 {
      margin: 0 0 20px;
    }
    
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      list-style: none;
      height: 100%;
      padding: 0;
      gap: 10px;

      li {
        width: 100%;
        max-width: 800px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 0 5px 2px #f3f3f3;
        
        button {
          border: none;
          background: none;
          padding: 15px 10px;
          height: 100%;
          width: 100%;
          font-size: 16px;
        }
      }
    }
  }

`;