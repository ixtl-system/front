import { useState } from "react";

import { api } from "@/shared/infra/api";

import {
  FeedbackMessage,
  Footer,
  FooterLinks,
  FooterNote,
  Hero,
  HeroActions,
  HeroContent,
  HeroSubtitle,
  HeroTitle,
  ImagePlaceholder,
  PageContainer,
  PrimaryButton,
  SecondaryLink,
  Section,
  SectionContent,
  SectionDescription,
  SectionText,
  SectionTitle,
} from "./styles";

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<
    | {
        message: string;
        status: "success" | "error";
      }
    | null
  >(null);

  async function handleEnterClick() {
    setIsLoading(true);
    setFeedback(null);

    try {
      await api.post("/sessions");
      setFeedback({
        message: "Conexão estabelecida com sucesso. Bem-vinde ao Instituto.",
        status: "success",
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        message: "Não foi possível iniciar a jornada agora. Tente novamente em instantes.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      {/* Hero section introducing the institute */}
      <Hero>
        <HeroContent>
          <HeroTitle>Instituto Ritos da Floresta</HeroTitle>
          <HeroSubtitle>
            Vivências que honram a ancestralidade, fortalecem a espiritualidade e conectam
            você à cura pelos rituais amazônicos.
          </HeroSubtitle>
          <HeroActions>
            <PrimaryButton onClick={handleEnterClick} disabled={isLoading}>
              {isLoading ? "Conectando..." : "Entrar"}
            </PrimaryButton>
            <SecondaryLink href="/login">Já sou participante</SecondaryLink>
          </HeroActions>
          {feedback && (
            <FeedbackMessage $status={feedback.status}>{feedback.message}</FeedbackMessage>
          )}
        </HeroContent>
      </Hero>

      {/* Upcoming events highlight section */}
      <Section id="eventos">
        <SectionContent>
          <SectionText>
            <SectionTitle>Próximos Encontros Cerimoniais</SectionTitle>
            <SectionDescription>
              Reservamos círculos íntimos sob a lua cheia e imersões semanais para a partilha de
              cantos, medicinas e rezos. Garanta sua presença e receba orientações com a nossa
              equipe de guardiões.
            </SectionDescription>
            <SecondaryLink href="/login">Reserve sua vaga</SecondaryLink>
          </SectionText>
          <ImagePlaceholder>Imagem do ritual</ImagePlaceholder>
        </SectionContent>
      </Section>

      {/* Institute overview section */}
      <Section id="instituto">
        <SectionContent>
          <ImagePlaceholder>Casa do Instituto</ImagePlaceholder>
          <SectionText>
            <SectionTitle>Casa de Cura e Formação</SectionTitle>
            <SectionDescription>
              Somos um instituto dedicado à preservação dos saberes tradicionais, oferecendo
              retiros, programas terapêuticos integrativos e formação de facilitadores alinhados à
              ética indígena.
            </SectionDescription>
          </SectionText>
        </SectionContent>
      </Section>

      {/* Shamanism teachings section */}
      <Section id="xamanismo">
        <SectionContent>
          <SectionText>
            <SectionTitle>Trilhas do Xamanismo</SectionTitle>
            <SectionDescription>
              Da medicina do rapé aos ritos de fogo, guiamos processos de expansão de
              consciência com responsabilidade, acolhendo buscadores em etapas respeitosas de
              aprendizado.
            </SectionDescription>
          </SectionText>
          <ImagePlaceholder>Elementos da floresta</ImagePlaceholder>
        </SectionContent>
      </Section>

      {/* Ayahuasca information section */}
      <Section id="ayahuasca">
        <SectionContent>
          <ImagePlaceholder>Chá Ayahuasca</ImagePlaceholder>
          <SectionText>
            <SectionTitle>A Força da Ayahuasca</SectionTitle>
            <SectionDescription>
              Explicamos os cuidados para a preparação, as dietas tradicionais e as orientações
              pós-rito, priorizando a segurança emocional, física e espiritual de cada
              participante.
            </SectionDescription>
          </SectionText>
        </SectionContent>
      </Section>

      {/* Contact and support section */}
      <Section id="contato">
        <SectionContent>
          <SectionText>
            <SectionTitle>Converse com nossos guardiões</SectionTitle>
            <SectionDescription>
              Trazemos uma escuta acolhedora para suas dúvidas sobre cerimônias, integração e
              acompanhamento terapêutico. Escreva para contato@ritosdafloresta.org ou fale pelo
              WhatsApp.
            </SectionDescription>
            <SecondaryLink href="mailto:contato@ritosdafloresta.org">
              Escrever para o Instituto
            </SecondaryLink>
          </SectionText>
          <ImagePlaceholder>Equipe acolhedora</ImagePlaceholder>
        </SectionContent>
      </Section>

      {/* Footer with additional navigation */}
      <Footer>
        <FooterLinks>
          <a href="#eventos">Eventos</a>
          <a href="#instituto">Instituto</a>
          <a href="#xamanismo">Xamanismo</a>
          <a href="#ayahuasca">Ayahuasca</a>
          <a href="#contato">Contato</a>
          <a href="/login">Acessar conta</a>
        </FooterLinks>
        <FooterNote>© {new Date().getFullYear()} Instituto Ritos da Floresta. Todos os direitos reservados.</FooterNote>
      </Footer>
    </PageContainer>
  );
}
