import styled from "styled-components";
import image from "@/assets/logo.png";

export const EventRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;

  .event-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 48px;

    width: 100%;
    height: 340px;
    padding: 0 30px;
    overflow: hidden;
    position: relative;
    background: url(${image}) center;
    

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(12px);
      background-color: rgba(0, 0, 0, 0.5);
    }

    section.event-info {
      display: flex;
      flex-direction: column;

      width: 100%;
      min-width: 300px;
      max-width: 400px;
      z-index: 2;

      h2 {
        position: relative;
        font-weight: 700;
        font-size: 28px;
        margin: 0 0 16px;
      }

      h2, h4 {
        color: #FFF;
        text-transform: capitalize;
      }

      h4 {
        display: flex;
        align-items: center;

        font-size: 14px;
        font-weight: 500;
        margin: 0 0 10px;

        svg {
          width: 20px;
          height: 20px;

          margin-right: 10px;
        }
      }

      .register-button {
        background-color: #2a9d8f;
      }

      .settings-button {
        color: #2a9d8f;
      }

      button {
        padding: 15px 25px;
        margin: 10px 0 0;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          color: #fff;
          background-color: #264653;
        }
      }
    }
    
    img.event-preview-image {
      position: relative;
      display: flex;
      align-items: flex-end;
      -webkit-box-pack: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      max-width: 420px;
      max-height: 240px;
      border-radius: 12px;
      background-position: 50% 50%;
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: rgba(25, 31, 40, 0.2) 0px 20px 36px 0px;
    }

  }

  .event-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-details {
    width: 100%;
    max-width: 900px;
    text-align: center;
    padding: 0 30px 40px;
  }

  h3, p {
    text-align: start;
  }

  h3 {
    margin: 20px 0 5px;
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  @media (max-width: 900px) {
    .event-cover img.event-preview-image  {
      display: none;
    }
  }

`;