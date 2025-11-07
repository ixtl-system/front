"use client"
import { Typography } from "antd"
import styled from "styled-components"

import { DefaultButton } from "@/shared/components/CustomStyled"

const { Text } = Typography

export const EventRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 100vh;
  padding: 36px 32px 72px;
  background: linear-gradient(180deg, #f7efe5 0%, #f2e5d5 45%, #eddcc7 100%);

  @media (max-width: 768px) {
    padding: 24px 18px 56px;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 48px 48px;
  border-radius: 36px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 236, 218, 0.94) 100%);
  box-shadow: 0 26px 44px rgba(84, 70, 52, 0.16);

  @media (max-width: 600px) {
    padding: 32px 26px 38px;
  }
`

export const StyledButton = styled(DefaultButton)`
  background: rgba(255, 255, 255, 0.85);
  color: #6f8f72;
  padding: 12px 28px;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid rgba(111, 143, 114, 0.35);
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  svg {
    font-size: 24px;
  }

  &:hover {
    transform: translateY(-1px);
    background: #6f8f72;
    color: #fbf5ec;
    box-shadow: 0 12px 24px rgba(111, 143, 114, 0.24);
  }
`

export const RequestButton = styled(DefaultButton)`
  background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
  color: #fbf5ec;
  gap: 10px;
  font-size: 16px;
  padding: 14px 26px;
  border-radius: 999px;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 16px 30px rgba(99, 130, 103, 0.28);

  &:hover {
    background: linear-gradient(135deg, #5f7e63 0%, #4f6d53 100%);
    color: #fbf5ec;
  }

  &[disabled] {
    filter: grayscale(0.35);
    cursor: not-allowed;
    box-shadow: none;

    &:hover {
      background: linear-gradient(135deg, #7f907b 0%, #6f806b 100%);
    }
  }
`

export const EventTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4vw, 42px);
  color: #3d3227;
`

export const EventSubtitle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #75695a;
`

export const EventInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 22px 24px;
  border-radius: 24px;
  background: rgba(111, 143, 114, 0.12);
  color: #5a5245;

  svg {
    width: 26px;
    height: 26px;
  }
`

export const SunIcon = styled.div`
  font-size: 24px;
  margin-right: 15px;
`

export const DateBadge = styled.span`
  background-color: #6f8f72;
  color: #fbf5ec;
  padding: 6px 16px;
  border-radius: 999px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
`

export const InfoText = styled(Text)`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #5f5345;
`

export const DescriptionTitle = styled.h4`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #3d3227;
  margin-top: 36px;
`

export const DescriptionText = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.7;
  color: #625847;
`
