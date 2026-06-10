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
          role="Lead gameplay Programmer & Designer"
          duration="3 months"
          blender
          unity
          github="https://github.com/venator-XR/venator-vr"
          li={[
            "Led a team of six to develop a VR horror experience",
            "Implemented core VR gameplay systems including interaction, inventory, and gameplay sequences using C#",
            "Built gameplay flow systems connecting exploration, cinematics, and boss encounters",
            "Developed reusable interaction logic for doors, triggers, pickups, and environmental events",
            "Designed a linear, narrative-driven gameplay experience",
            "Built immersive and tense atmosphere through scale, limited visibility and lighting",
          ]}
          vid="/vids/VenatorVid.mp4"
        />
      </ScrollReveal>

      <div className="w-2/4 h-1 bg-linear-to-r from-0% from-white/0 via-white to-100% to-white/0 " />

      <ScrollReveal>
        <Project
          title="Baifo's Farm"
          role="Lead Gameplay Programmer & Designer"
          itchLink="https://maritocreates.itch.io/baifos-farm"
          duration="5 months"
          max
          unity
          github="https://github.com/boregxrd/BaifosFarm"
          li={[
            "Led feature development and coordinated gameplay implementation across the team",
            "Implemented economy, UI, and gameplay progression systems using C#",
            "Developed a persistent economy system handling game state across multiple scenes",
            "Built a dynamic entity spawning system with collision-aware placement logic",
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
            "Solo developer, winner at the university's Global Game Jam event (48h scope)",
            "Implemented character movement, abilities, and gameplay systems using C#",
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
