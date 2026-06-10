import ScrollReveal from "../../components/ScrollReveal";

const About = () => {
  return (
    <section className="relative w-full flex justify-between items-stretch pl-32 text-left text-white">
      <div id="about" className="absolute -top-48" />
      <div className="w-55/100 pr-20">
        <h3>About me</h3>
        <ScrollReveal>
          <p className="pt-6 text-2xl text-gray-200 pb-20 text-justify">
            Gameplay Programmer and Game Developer with experience building
            complete games in Unity, leading small teams, and developing
            gameplay systems from concept to implementation.
            <br />
            <br />
            My background spans gameplay programming, systems design, and 3D
            content creation, allowing me to collaborate across the full
            development pipeline and rapidly prototype new ideas.
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
