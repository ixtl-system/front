import styled from "styled-components";

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px; 
  border-radius: 32px;
  background-color: #FFFFFF;
`
export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0 40px;
  width: 100%;
  
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h1 {
      font-family: Montserrat;
      font-weight: 700;
      font-size: 32px;
      line-height: 140%;
      letter-spacing: 0%;
      color: #0C120C;
    }
    
    p {
      font-family: Montserrat;
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0%;
      color: #7D7C83;
    }
  }
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    height: max-content;
    width: max-content;
    padding: 10px 32px;
    background-color: #96AE8E;
    border-radius: 32px;
    border: none;

    font-family: Montserrat;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0%;
    color: #FAFAFA;

    transition: 0.4s all;

    &:hover {
      transform: scale(1.1);
    }

  }

  @media (max-width: 600px) {
    div h1 {
      font-size: 24px;
    }

    button {
      font-size: 16px;
    }
  }

`

export const EventsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  .card {
    display: flex;
    flex-direction: column;
    padding: 16px;

    width: 280px;
    height: 427px;
    border-radius: 32px;
    border: 1px solid #7D7C83;

    transition: all 0.4s;

    .tag {
      font-family: Montserrat;
      font-weight: 700;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0%;
      text-align: center;
      width: max-content;

      color: #FFF;
      background-color: #96AE8E;
      padding: 5px 10px;
      border-radius: 16px;
    }

    .time {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 64px 0 0;

      span {
        font-family: Montserrat;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        letter-spacing: 0%;
        color: #7D7C83;
      }
    }

    h2 {
      font-family: Montserrat;
      font-weight: 700;
      font-size: 22px;
      line-height: 140%;
      letter-spacing: 0%;
      color: #0C120C;
      margin: 10px 0;
    }

    p {
      font-family: Montserrat;
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0%;
      color: #7D7C83;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4; 
      overflow: hidden; 
      text-overflow: ellipsis; 
      line-height: 1.5; 
      max-height: calc(1.5em * 4); 
    }

    &:hover {
      background-color:#96AE8E;

      .time span, h2, p {
        color: #FFF8ED;
      }

      .time svg path {
        fill: #FFF8ED !important;
      }

      .tag {
        background-color: #FFF8ED;
        color: #96AE8E;
      }
    }
  }


`;