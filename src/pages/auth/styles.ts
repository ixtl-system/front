import styled from "styled-components";

export const SignContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 32px 40px 48px;
  background: linear-gradient(180deg, #fff7ec 0%, #f5ecde 40%, #f2e5d6 100%);
  overflow-x: hidden;
  color: #2f2a1f;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: multiply;
    opacity: 0.5;
    z-index: 0;
  }

  &::before {
    width: 360px;
    height: 360px;
    top: -120px;
    right: -80px;
    background: radial-gradient(circle at 30% 30%, #c5d1b8 0%, transparent 70%);
  }

  &::after {
    width: 420px;
    height: 420px;
    bottom: -180px;
    left: -120px;
    background: radial-gradient(circle at 50% 50%, #e9d2ba 0%, transparent 75%);
  }

  .landing-header,
  .landing,
  .landing-footer,
  .auth-overlay {
    z-index: 1;
  }

  .landing-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    max-width: 1180px;
    width: 100%;
    margin: 0 auto 48px;

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;

      img {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        box-shadow: 0 12px 30px rgba(47, 42, 31, 0.12);
      }

      span {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: #2f2a1f;
      }
    }

    .header-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-end;
    }
  }

  .primary-button,
  .outline-button,
  .ghost-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 15px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    padding: 12px 24px;
  }

  .primary-button {
    background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
    color: #fbf5ec;
    box-shadow: 0 10px 22px rgba(102, 133, 107, 0.28);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 26px rgba(102, 133, 107, 0.34);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 8px 18px rgba(102, 133, 107, 0.2);
    }
  }

  .outline-button {
    background: rgba(255, 255, 255, 0.45);
    color: #4f5a48;
    border: 1px solid rgba(111, 143, 114, 0.4);

    svg {
      font-size: 18px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.65);
      transform: translateY(-1px);
    }
  }

  .ghost-button {
    background: transparent;
    color: #76563f;
    border: 1px solid transparent;

    &:hover {
      border-color: rgba(118, 86, 63, 0.25);
      background: rgba(246, 235, 222, 0.6);
    }
  }

  .landing {
    display: flex;
    flex-direction: column;
    gap: 72px;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 48px;
    align-items: stretch;

    .hero-text {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .eyebrow {
        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #8e6c4a;
      }

      h1 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(36px, 5vw, 52px);
        line-height: 1.1;
        color: #2f2a1f;
      }

      p {
        font-family: "Montserrat", sans-serif;
        font-size: 18px;
        line-height: 1.7;
        color: #5a5245;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
    }

    .hero-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 36px;
      border-radius: 32px;
      background: linear-gradient(165deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 244, 228, 0.92) 100%);
      box-shadow: 0 30px 60px rgba(104, 86, 63, 0.18);
      overflow: hidden;
      color: #503b27;

      svg {
        font-size: 48px;
        color: #9bb393;
      }

      h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 26px;
        font-weight: 700;
      }

      p {
        font-family: "Montserrat", sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #5f4a35;
      }
    }
  }

  .highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;

    .highlight-card {
      padding: 28px;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.68);
      box-shadow: 0 16px 32px rgba(92, 75, 54, 0.12);
      backdrop-filter: blur(6px);

      h3 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        font-size: 20px;
        color: #4a3a28;
        margin-bottom: 12px;
      }

      p {
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #635744;
      }
    }
  }

  .experience {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 40px;
    align-items: start;

    .experience-text {
      display: flex;
      flex-direction: column;
      gap: 18px;

      h2 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(28px, 3.6vw, 40px);
        color: #2f2a1f;
      }

      p {
        font-family: "Montserrat", sans-serif;
        font-size: 17px;
        line-height: 1.7;
        color: #5a5245;
      }
    }

    .experience-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        gap: 20px;
        padding: 22px 26px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.78);
        box-shadow: 0 14px 28px rgba(84, 69, 47, 0.1);

        span {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #9bb393;
        }

        h4 {
          font-family: "Montserrat", sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #433524;
          margin-bottom: 6px;
        }

        p {
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          color: #64563f;
          line-height: 1.6;
        }
      }
    }
  }

  .landing-footer {
    width: 100%;
    max-width: 1180px;
    margin: 64px auto 0;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: #6d5f4a;
  }

  .auth-overlay {
    position: fixed;
    inset: 0;
    background: rgba(36, 28, 21, 0.4);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .auth-card {
    position: relative;
    width: 100%;
    max-width: 520px;
    border-radius: 32px;
    background: linear-gradient(170deg, #ffffff 0%, #f8efe2 100%);
    box-shadow: 0 24px 50px rgba(59, 46, 33, 0.25);
    padding: 32px 28px 40px;
  }

  .close-button {
    position: absolute;
    top: 18px;
    right: 18px;
    border: none;
    background: rgba(255, 255, 255, 0.85);
    color: #6f5744;
    border-radius: 999px;
    padding: 8px 18px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  .form-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    img {
      width: 120px;
      height: auto;
    }
  }

  @media (max-width: 960px) {
    padding: 24px 20px 40px;

    .landing-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .hero,
    .experience {
      grid-template-columns: 1fr;
    }

    .hero-panel {
      order: -1;
    }
  }

  @media (max-width: 600px) {
    padding: 20px 16px 32px;

    .primary-button,
    .outline-button,
    .ghost-button {
      width: 100%;
    }

    .auth-card {
      padding: 28px 22px 36px;
    }

    .close-button {
      padding: 6px 14px;
    }
  }
`;

export const SignInButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #fbf5ec;
  background: linear-gradient(135deg, #6f8f72 0%, #5f7e63 100%);
  outline: none;
  border: none;
  width: 100%;
  border-radius: 18px;
  padding: 14px 0;
  margin: 32px 0 18px;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(99, 130, 103, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 28px rgba(99, 130, 103, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 10px 20px rgba(99, 130, 103, 0.2);
  }
`;

export const OptionsButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  color: #7b6048;
  transition: color 0.2s ease;

  &:hover {
    color: #5f4733;
  }
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: #5f7e63;
  margin: 36px 0 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #7d715f;
  margin: 0 0 32px;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: var(--red-500);
  margin: 5px 5px 10px;
`;