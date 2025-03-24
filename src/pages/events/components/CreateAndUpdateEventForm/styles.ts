import styled from "styled-components";

export const EventFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const EventForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 600px;
  padding: 40px 0;


  section {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 10px 0 0;

    div.date {
      display: flex;
      flex-direction: column;
      width: 100%;

      span.error {
        margin: 10px 0;
      }
    }
  }

  .ant-picker {
    width: 100%;
    max-width: 200px;
    height: 40px;
  }

  button {
    height: 40px;
  }

  input, textarea {
    margin: 10px 0 ;
  }

  span.error {
    font-size: 14px;
    color: #e91e63;
    margin: 0 0 10px;
  }
`;