import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f2e8 0%, #f3e8d0 100%);
  color: #3f2f25;
  font-family: "Inter", "Helvetica", sans-serif;
`;

export const Hero = styled.header`
  padding: 3rem 1.5rem;
  text-align: center;
  background: radial-gradient(circle at top left, rgba(117, 96, 77, 0.2), transparent 70%),
    radial-gradient(circle at bottom right, rgba(156, 132, 102, 0.35), transparent 60%);
`;

export const HeroContent = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  line-height: 1.1;
  color: #2c1d12;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #5a4637;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.9rem 1.75rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  background: #8a5a3a;
  color: #fff9f1;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(138, 90, 58, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SecondaryLink = styled.a`
  color: #6b4a2b;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #6b4a2b;
  }
`;

export const FeedbackMessage = styled.p<{ $status: "success" | "error" }>`
  font-size: 0.95rem;
  color: ${({ $status }) => ($status === "success" ? "#2f6f4f" : "#8a2f2f")};
`;

export const Section = styled.section`
  padding: 3rem 1.5rem;
  border-top: 1px solid rgba(63, 47, 37, 0.1);
  background: rgba(255, 252, 245, 0.65);
`;

export const SectionContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }
`;

export const SectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: #3d2a1b;
`;

export const SectionDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #5b4330;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: repeating-linear-gradient(
      45deg,
      rgba(133, 101, 76, 0.2),
      rgba(133, 101, 76, 0.2) 10px,
      rgba(243, 232, 208, 0.3) 10px,
      rgba(243, 232, 208, 0.3) 20px
    ),
    #f0e1ca;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #917353;
  font-weight: 600;
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 2.5rem 1.5rem;
  background: #3f2f25;
  color: #f7f2e8;
  text-align: center;
`;

export const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  a {
    color: #f7f2e8;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const FooterNote = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 249, 241, 0.8);
`;
