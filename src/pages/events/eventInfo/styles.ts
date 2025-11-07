"use client"
import { Typography } from "antd"
import styled from "styled-components"

import { DefaultButton } from "@/shared/components/CustomStyled"

const {  Text } = Typography

export const EventRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(100% - 64px);
  background-color: #f9f5eb;
  min-height: 100vh;
  margin: 32px;
  padding: 24px;
  border-radius: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 32px;
`

export const ContentContainer = styled.div`
`

export const StyledButton = styled(DefaultButton)`
  background: none;
  color: #96AE8E;
  padding: 10px 32px;
  gap: 5px;

  svg {
    font-size: 30px;
  }

  &:hover {
    background-color: #96AE8E;
    color: #FAFAFA
  }
`

export const RequestButton = styled(DefaultButton)`
  background-color: #96AE8E;
  color: #FAFAFA;
  gap: 10px;

  font-size: 16px;
  padding: 5px 10px 3px;

  &:hover {
    background-color: #fff;
    color: #96AE8E
  }

  &[disabled] {
    filter: grayscale(1);
    cursor: not-allowed;

    &:hover {
      background-color: #96AE8E;
      color: #FAFAFA
    }
  }
  
`

export const EventTitle = styled.h2`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 32px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #0C120C;

  margin-bottom: 10px;
`

export const EventSubtitle = styled.p`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #7D7C83;
  margin-bottom: 30px;
`

export const EventInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 20px;
`

export const SunIcon = styled.div`
  font-size: 24px;
  margin-right: 15px;
`

export const DateBadge = styled.span`
  background-color: #8baa88;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
`

export const InfoText = styled(Text)`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #7D7C83;
`

export const DescriptionTitle = styled.h4`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0%;
  color: #0C120C;
  margin: 60px 0 20px;

`

export const DescriptionText = styled.p`
  font-family: Montserrat;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  text-decoration-style: solid;
  color: #7D7C83;
`