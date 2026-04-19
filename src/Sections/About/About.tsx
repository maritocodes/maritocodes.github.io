import ScrollReveal from "../../components/ScrollReveal";

const About = () => {
  return (
    <section className="relative w-full flex justify-between items-stretch pl-40 text-left text-white">
      <div id="about" className="absolute -top-48" />
      <div className="w-[58ch]">
        <h3>About me</h3>
        <ScrollReveal>
          <p className="pt-6 text-2xl text-gray-200 py-20">
            Technical Gameplay Designer with experience leading small teams (4–6
            people) and developing complete games in Unity. I focus on designing
            and iterating on gameplay systems to create engaging and polished
            player experiences.
            <br />
            <br />
            I work hands-on with implementation, allowing me to quickly
            prototype ideas and refine them directly in-engine.
            <br />
            <br />
            My background in 3D art and texturing allows me to work efficiently
            across the full pipeline.
          </p>
        </ScrollReveal>
      </div>
      <div className="bg-[#2F4D78] w-45/100 flex justify-center items-center">
        <img
          src="/portal_poster.webp"
          className="size-32 rotate-15 select-none"
          draggable={false}
        />
      </div>
    </section>
  );
};

export default About;
