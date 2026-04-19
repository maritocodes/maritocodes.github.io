import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import HeroPortals from "./HeroPortals";

const handleProjectsClick = () => {
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
};

function Hero() {
  return (
    <section
      className="pl-40 w-full h-[90dvh] flex items-center justify-center"
      id="home"
    >
      <div className="w-55/100 text-left">
        <div>
          <h1>Mario Luis</h1>
          <h2>
            Technical Gameplay Designer
            <br />& Game Developer
          </h2>
          <p className="text-2xl max-w-[35ch] pt-4">
            Designing and implementing gameplay systems with a strong focus on
            player experience and immersion.
          </p>
        </div>

        <div className="items-center flex gap-8 mt-12">
          <Button as="button" className="!px-8" onClick={handleProjectsClick}>
            Projects
          </Button>
          <div className="flex items-center gap-4">
            <div className="mr-2 bg-white size-2 mt-1 rounded-full" />
            <ButtonLink link="/CV.pdf" name="CV" download />
            <ButtonLink
              link="https://www.github.com/maritocodes"
              img="/icons/github.svg"
              invert
            />
            <ButtonLink
              link="https://www.linkedin.com/in/mario-lm/"
              img="/icons/linkedin.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-45/100 h-full">
        <HeroPortals />
      </div>
    </section>
  );
}

export default Hero;
