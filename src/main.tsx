// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Hero from "./Sections/Hero/Hero.tsx";
import About from "./Sections/About/About.tsx";
import Skills from "./Sections/Skills/Skills.tsx";
import Projects from "./Sections/Projects/Projects.tsx";
import { LoadingProvider, useLoading } from "./LoadingContext.tsx";
import LoadingScreen from "./LoadingScreen.tsx";
import MobileWarning from "./MobileWarning.tsx";

const isMobileDevice = () => {
  const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const screenWidthCheck = window.innerWidth < 768; // Tailwind 'md' breakpoint
  
  return userAgentCheck || screenWidthCheck;
};

const App = () => {
  const { allLoaded } = useLoading();
  return (
    <>
      <LoadingScreen visible={!allLoaded} />
      <div className="bg-linear-to-b from-[#2F4D78] to-[#10151D]">
        <Hero />
        <About />
      </div>
      <Skills />
      <Projects />
    </>
  );
};

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

if (isMobileDevice()) {
  root.render(
    <StrictMode>
      <MobileWarning />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </StrictMode>
  );
}