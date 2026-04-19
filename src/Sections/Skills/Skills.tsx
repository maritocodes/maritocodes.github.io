import ThreeModel from "../../components/ThreeModel";
import SkillBox from "./SkillBox";
import SkillCard from "./SkillCard";
import SkillsCarousel from "./SkillsCarrousel";

const Skills = () => {
  return (
    <section className="relative w-full bg-[radial-gradient(rgba(255,255,255,0.2),rgba(0,0,0,.8)),url('/skills_background.webp')] bg-repeat bg-top flex flex-col pt-8 pb-16">
      {/* Portals with absolute pos */}
      <div id="skills" className="absolute -top-16" />
      <div className="flex justify-between w-full items-center absolute -mt-8 z-50">
        <img
          draggable={false}
          className="w-auto scale-y-75 select-none"
          src="blue_portal_big.webp"
        />
        <img
          draggable={false}
          className="w-auto scale-y-75 select-none"
          src="orange_portal_big.webp"
        />
      </div>

      {/* Actual content */}
      <h3 className="mb-6">skills</h3>
      <SkillsCarousel>
        <SkillBox cage>
          <ThreeModel
            delay={1000}
            model="/models/goat.glb"
            cameraPosition={{ x: 8, y: 1, z: 6 }}
            cameraTarget={{ x: -0.3, y: 1, z: 0 }}
            orthoSize={1}
            scale={2.2}
            width={200}
            height={150}
          />
        </SkillBox>

        <SkillBox title="Design">
          <SkillCard title="Gameplay Systems" />
          <SkillCard title="Player Experience & Feel" />
          <SkillCard title="Prototyping & Iteration" />
        </SkillBox>

        <SkillBox cage>
          <ThreeModel
            delay={1500}
            model="/models/bat.glb"
            cameraPosition={{ x: -8, y: 0, z: 8 }}
            cameraTarget={{ x: 0.2, y: 0.7, z: 0 }}
            orthoSize={1}
            scale={12}
            width={180}
            height={120}
          />
        </SkillBox>

        <SkillBox title="Technical">
          <SkillCard img="/icons/csharp.svg" title="C# OOP" invert />
          <SkillCard img="/icons/cpp.webp" title="C++ OOP" invert />
          <SkillCard img="/icons/unity.svg" title="Unity" />
        </SkillBox>

        <SkillBox cage>
          <ThreeModel
            delay={2000}
            model="/models/tiki.glb"
            cameraPosition={{ x: -8, y: 1, z: 0 }}
            cameraTarget={{ x: 0, y: 1.25, z: 0 }}
            orthoSize={1}
            scale={2.2}
            width={250}
            height={200}
            animationIndex={1}
          />
        </SkillBox>

        <SkillBox title="Others">
          <SkillCard img="/icons/blender.svg" title="Blender" />
          <SkillCard img="/icons/github.svg" title="GitHub" invert />
          <SkillCard title="Agile/SCRUM" />
        </SkillBox>
      </SkillsCarousel>
    </section>
  );
};

export default Skills;
