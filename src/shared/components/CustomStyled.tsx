import styled from "styled-components"

export const CustomTitle = styled.h2`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 32px;
  line-height: 140%;
  letter-spacing: 0%;
  margin-bottom: 10px;
`

export const CustomSubtitle = styled.p`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  margin-bottom: 30px;
  color: #7D7C83;
`
export const DefaultButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 32px;
  padding: 10px 16px;
  border: 2px solid #96AE8E;
  transition: 0.4s all;

  font-family: Montserrat;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0%;

  @media (max-width: 600px) {
    font-size: 14px;

    svg {
      font-size: 18px !important;
    }
  }
`