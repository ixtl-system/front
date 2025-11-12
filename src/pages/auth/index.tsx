import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PiArrowRightThin, PiInstagramLogoBold, PiSparkleLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

import IxtlLogoMd from "@/assets/logo-md.png";
import { ForgotPasswordForm } from "@/pages/auth/components/forgotPasswordForm";
import { SignInForm } from "@/pages/auth/components/SignInForm";
import { SignUpForm } from "@/pages/auth/components/SignUpForm";

import { SignContainer } from "./styles";

export type IPage = "signIn" | "signUp" | "forgotPassword";

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<IPage>("signIn");
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const pages = {
    signIn: <SignInForm onNavigate={setPage} />,
    signUp: <SignUpForm onNavigate={setPage} />,
    forgotPassword: <ForgotPasswordForm onNavigate={setPage} />,
  };

  const handleOpenAuth = (nextPage: IPage = "signIn") => {
    setPage(nextPage);
    setIsAuthVisible(true);
  };

  const handleCloseAuth = () => {
    setIsAuthVisible(false);
  };

  useEffect(() => {
    const state = location.state as { openAuthModal?: boolean; authPage?: IPage } | null;

    if (state?.openAuthModal) {
      setPage(state.authPage ?? "signIn");
      setIsAuthVisible(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  const highlights = [
    {
      title: "Rituals & Cerimônias",
      description:
        "Ayahuasca, meditações guiadas e rodas de canto que honram saberes indígenas brasileiros e Lakota.",
    },
    {
      title: "Cuidado Integrado",
      description:
        "Reiki, constelação familiar e acompanhamento emocional para apoiar processos de cura profunda.",
    },
    {
      title: "Comunidade Viva",
      description:
        "Encontros, partilhas e eventos contínuos para sustentar jornadas espirituais com acolhimento e respeito.",
    },
  ];

  return (
    <SignContainer>
      <Helmet title="Instituto Trabalhadores da Luz" />

      <header className="landing-header">
        <div className="brand">
          <img src={IxtlLogoMd} alt="Instituto Trabalhadores da Luz" />
          <span>Portal Trabalhadores da Luz</span>
        </div>

        <div className="header-actions">
          <a
            href="https://www.instagram.com/instituto.trabalhadoresdaluz/?locale=pt_BR&hl=am-et"
            target="_blank"
            rel="noreferrer"
            className="outline-button"
          >
            <PiInstagramLogoBold aria-hidden />
            Instagram oficial
          </a>

          <button type="button" className="primary-button" onClick={() => handleOpenAuth("signIn")}>
            Entrar no portal
            <PiArrowRightThin aria-hidden />
          </button>
        </div>
      </header>

      <main className="landing" role="main">
        <section className="hero">
          <div className="hero-text">
            <span className="eyebrow">Cura, ancestralidade e presença</span>
            <h1>Uma jornada luminosa guiada por tradições ancestrais</h1>
            <p>
              O Instituto Trabalhadores da Luz acolhe processos de cura por meio de cerimônias de ayahuasca,
              Reiki, constelação familiar e vivências espirituais. Um espaço seguro para recordar quem você é.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => handleOpenAuth("signIn")}>
                Acessar minha conta
                <PiArrowRightThin aria-hidden />
              </button>

              <button type="button" className="ghost-button" onClick={() => handleOpenAuth("signUp")}>
                Quero participar da comunidade
              </button>
            </div>
          </div>

          <div className="hero-panel" aria-hidden>
            <PiSparkleLight />
            <h2>Espaço de transformação</h2>
            <p>
              Vivências cuidadosamente guiadas para integrar corpo, mente e espírito com respeito à floresta e
              aos povos que guardam esta medicina.
            </p>
          </div>
        </section>

        <section className="highlights" aria-label="Práticas do instituto">
          {highlights.map(highlight => (
            <article key={highlight.title} className="highlight-card">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </section>

        <section className="experience">
          <div className="experience-text">
            <h2>Um portal vivo para a espiritualidade</h2>
            <p>
              A plataforma foi redesenhada para oferecer tranquilidade, equilíbrio cromático e fluidez. Cada
              seção respeita a natureza orgânica das tradições que nos inspiram, valorizando legados indígenas e
              Lakota enquanto simplifica sua navegação diária.
            </p>
          </div>

          <ul className="experience-list">
            <li>
              <span>01</span>
              <div>
                <h4>Agenda intuitiva</h4>
                <p>Visualização harmoniosa dos eventos, com cartões amplos e leitura facilitada.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h4>Gestão acolhedora</h4>
                <p>Modais e listas com respiro visual para conduzir inscrições e presenças com serenidade.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h4>Experiência responsiva</h4>
                <p>Interface que se adapta a qualquer tela, mantendo a mesma essência em todos os momentos.</p>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Instituto Trabalhadores da Luz. Honrando nossos ancestrais.</p>
      </footer>

      {isAuthVisible ? (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-label="Acesso ao portal">
          <div className="auth-card">
            <button type="button" className="close-button" onClick={handleCloseAuth}>
              Fechar
            </button>

            <div className="form-content">
              <img src={IxtlLogoMd} alt="Instituto Trabalhadores da Luz" />
              {pages[page]}
            </div>
          </div>
        </div>
      ) : null}
    </SignContainer>
  );
}
