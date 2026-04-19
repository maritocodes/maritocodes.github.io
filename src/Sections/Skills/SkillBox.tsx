import type { PropsWithChildren } from "react";

interface SkillBoxInterface {
  title?: string;
  cage?: boolean;
}

const SkillBox = (props: PropsWithChildren<SkillBoxInterface>) => {
  const isCage = props.cage;

  return (
    <div className="w-fit h-fit flex flex-col items-center">
      <div className="bg-skillbg rounded-t-xl w-4 h-8" />
      <div className="border-skillbg border-[16px] border-b-0 rounded-t-xl w-16 h-6" />

      {/* CONTENT */}
      <div
        className={`relative flex flex-col items-center gap-4 w-full overflow-hidden rounded-2xl ${
          isCage ? "py-4" : "bg-skillbg shadow-inner-custom p-6"
        }`}
      >
        {props.title && (
          <p className="text-white font-bold text-3xl whitespace-nowrap">
            {props.title}
          </p>
        )}

        {props.children}

        {/* CAGE MODE */}
        {isCage && (
          <>
            {/* techo */}
            <div className="absolute top-0 left-0 w-full h-4 bg-skillbg" />

            {/* suelo */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-skillbg" />

            {/* barras */}
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3 h-full bg-skillbg" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillBox;
