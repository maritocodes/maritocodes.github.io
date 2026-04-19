import PortalFall from "./PortalFall";

const MODELS = [
  {
    model: "/models/falling_goat.glb",
    scale: 0.8,
    animationIndex: 0,
    weight: 6,
  },
  {
    model: "/models/falling_flashlight.glb",
    scale: 1.1,
    animationIndex: 0,
    weight: 2,
  },
  {
    model: "/models/falling_tiki-v2.glb",
    scale: 0.7,
    animationIndex: 1,
    weight: 10,
  },
  {
    model: "/models/falling_pistol.glb",
    scale: 2,
    animationIndex: 1,
    weight: 4,
  },
];

const CAMERA = { x: 5, y: 0, z: 5 };

function HeroPortals() {
  return (
    <div className="flex flex-col h-full justify-between relative">
      <img className="z-10 select-none" src="blue_portal.webp" draggable={false} />
      <div className="absolute inset-0 pt-10 pb-0">
        <PortalFall
          models={MODELS}
          fallSpeed={1.5}
          spacing={0.4}
          orthoSize={1.5}
          cameraPosition={CAMERA}
        />
      </div>
      <img className="z-10 select-none" src="orange_portal.webp" draggable={false}  />
    </div>
  );
}

export default HeroPortals;
