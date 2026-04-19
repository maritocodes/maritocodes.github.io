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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>,
);