import type { PropsWithChildren } from "react";
import Button from "../../components/Button";
import { useEffect, useRef } from "react";
import { useLoading } from "../../LoadingContext";

interface ProjectInterface {
  vid: string;
  itchLink?: string;
  title: string;
  role: string;
  li: string[];
  duration: string;
  // tools below
  github?: string;
  blender?: boolean;
  unity?: boolean;
  max?: boolean;
}

const Project = (props: PropsWithChildren<ProjectInterface>) => {
  const doneRef = useRef<(() => void) | null>(null);
  const { register } = useLoading();

  if (doneRef.current === null) {
    doneRef.current = register(props.vid); // register() returns the done() function, store it
  }

  return (
    <div className="flex gap-8 items-top w-[80dvw] min-h-80 rounded-2xl my-4">
      {/* IMAGE & BUTTON */}
      <div className="relative flex-shrink-0 w-1/2 self-stretch flex flex-col justify-start">
        <video
          preload="none"
          src={props.vid}
          onCanPlayThrough={() => doneRef.current?.()}
          className="absolute inset-0 w-full h-full rounded-2xl bg-white object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        {props.itchLink && (
          <Button
            as="link"
            to={props.itchLink}
            className="bt-itch absolute bottom-4 left-4"
          >
            Play on Itch.io
          </Button>
        )}
      </div>

      {/* TEXT */}
      <div className="w-full text-left text-white flex flex-col justify-between">
        <div>
          <h4>{props.title}</h4>
          <p className="font-bold text-xl">{props.role}</p>
          <ul className="list-disc mt-2">
            {props.li.map((element) => (
              <li className="ml-6" key={element}>
                {element}
              </li>
            ))}
          </ul>
        </div>
        <div className="inline-flex justify-between mt-4">
          <div className="inline-flex gap-2 items-center">
            <img
              draggable={false}
              src="/icons/sandclock.svg"
              className="size-5 select-none -mr-1"
              alt=""
            />
            {props.duration}
            <div className="mx-2 bg-white size-1 mt-1 rounded-full" />
            {props.github && (
              <img
                draggable={false}
                src="/icons/github.svg"
                className="size-6 select-none"
              />
            )}
            {props.unity && (
              <img
                draggable={false}
                src="/icons/unity.svg"
                className="size-6 select-none invert"
              />
            )}
            {props.blender && (
              <img
                draggable={false}
                src="/icons/blender.svg"
                className="size-6 select-none invert"
              />
            )}
            {props.max && (
              <img
                draggable={false}
                src="/icons/3dsmax.svg"
                className="size-6 select-none"
              />
            )}
          </div>
          {props.github && (
            <Button as="link" to={props.github} className="bt-git">
              GitHub Repo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Project;
