import styled from "styled-components";

export const EventsContainer = styled.div`
  min-height: 100%;
  padding: 36px 32px 72px;
  background: linear-gradient(180deg, #f7efe5 0%, #f2e5d5 40%, #efe1cf 100%);

  @media (max-width: 768px) {
    padding: 24px 18px 56px;
  }
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
`;

export const EventHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 38px 40px;
  border-radius: 32px;
  background: linear-gradient(125deg, rgba(255, 255, 255, 0.9) 0%, rgba(244, 232, 214, 0.92) 100%);
  box-shadow: 0 28px 48px rgba(98, 85, 63, 0.16);
  color: #2f2a1f;

  span {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #8e6c4a;
  }

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: clamp(30px, 4vw, 40px);
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #5f5345;
    max-width: 720px;
  }

  @media (max-width: 600px) {
    padding: 28px 24px;
  }
`;

export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 6px;

    h1 {
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: clamp(26px, 3.2vw, 34px);
      color: #3d3227;
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 15px;
      color: #766a5e;
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 28px;
    border-radius: 999px;
    border: none;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #fbf5ec;
    background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
    box-shadow: 0 12px 26px rgba(105, 134, 109, 0.28);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 28px rgba(105, 134, 109, 0.34);
    }

    svg {
      font-size: 20px;
    }
  }

  @media (max-width: 600px) {
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const EventsListWrapper = styled.div`
  padding: 28px 32px 36px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 20px 38px rgba(97, 80, 56, 0.12);

  @media (max-width: 768px) {
    padding: 22px 18px 28px;
  }
`;

export const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;

  .card {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 24px;
    border-radius: 28px;
    border: none;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.94) 0%, rgba(247, 236, 219, 0.94) 100%);
    box-shadow: 0 16px 32px rgba(79, 64, 46, 0.16);
    cursor: pointer;
    text-align: left;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .tag {
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 14px;
      color: #fbf5ec;
      background: #6f8f72;
      padding: 6px 14px;
      border-radius: 999px;
    }

    .time {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: #665743;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    h2 {
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 20px;
      color: #3d3227;
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.6;
      color: #625847;
      min-height: 84px;
    }

    .card-footer {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid rgba(111, 143, 114, 0.2);

      span {
        font-family: "Montserrat", sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #6b8a6e;
      }
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 40px rgba(79, 64, 46, 0.22);
    }
  }
`;