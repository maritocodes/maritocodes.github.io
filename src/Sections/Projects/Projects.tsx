import Project from "./Project";
import ScrollReveal from "../../components/ScrollReveal";

const Projects = () => {
  return (
    <section
      className="bg-linear-to-t from-[#2F4D78] to-[#10151D] py-16 w-full flex flex-col items-center gap-8"
      id="projects"
    >
      <h3 className="">Projects</h3>

      <div className="w-2/4 h-1 bg-linear-to-r from-0% from-white/0 via-white to-100% to-white/0" />

      <ScrollReveal>
        <Project
          title="Venator (VR)"
          role="Gameplay Programmer & Lead Designer"
          duration="3 months"
          blender
          unity
          github="https://github.com/venator-XR/venator-vr"
          li={[
            "Led a team of six to develop a VR horror experience",
            "Designed a linear, narrative-driven gameplay experience",
            "Built immersive and tense atmosphere through scale, limited visibility and lighting",
            "Iterated on core gameplay direction, getting concepts to a polished experience",
            "Designed intuitive VR interactions and a quick-switch inventory system to maintain flow between exploration and combat",
            "Directed audio design by defining placement and usage of SFX to enhance atmosphere",
            "Led overall design decisions, refining ideas into a cohesive and achievable vision",
          ]}
          vid="/vids/VenatorVid.mp4"
        />
      </ScrollReveal>

      <div className="w-2/4 h-1 bg-linear-to-r from-0% from-white/0 via-white to-100% to-white/0 " />

      <ScrollReveal>
        <Project
          title="Baifo's Farm"
          role="Gameplay Programmer & Lead Designer"
          itchLink="https://maritocreates.itch.io/baifos-farm"
          duration="5 months"
          max
          unity
          github="https://github.com/boregxrd/BaifosFarm"
          li={[
            "Lead Designer & Gameplay Programmer in a 6-person team",
            "Led design by consolidating ideas into cohesive and scalable gameplay systems",
            "Designed resource management loop focused on feeding, collecting and selling to drive progression",
            "Developed economy creating player decisions and incentivation to keep playing",
            "Iterated balance and progression pacing for different playstyles",
            "Created and integrated 3D assets",
          ]}
          vid="/vids/BaifosVid.mp4"
        />
      </ScrollReveal>

      <div className="w-2/4 h-1 bg-linear-to-r from-0% from-white/0 via-white to-100% to-white/0 " />

      <ScrollReveal>
        <Project
          itchLink="https://maritocreates.itch.io/mask-64"
          title="Mask 64"
          role="Designer, Programmer & 3D Artist"
          duration="48 hours"
          blender
          unity
          li={[
            "Solo developer, Game Jam winner (48h scope)",
            "Designed platforming loop based on revealing paths",
            "Created an ability that shifts the environment, enabling temporary additional platforms",
            "Designed movement mechanics to support player recovery and reduce frustation",
            "Developed and integrated all 3D assets to support gameplay atmosphere",
          ]}
          vid="/vids/Mask64Vid.mp4"
        />
      </ScrollReveal>
    </section>
  );
};

export default Projects;
