interface ButtonLinkInterface {
  link: string;
  img?: string;
  name?: string;
  invert?: boolean;
  download?: boolean;
}

const ButtonLink = (props: ButtonLinkInterface) => {
  return (
    <a
      draggable={false}
      href={props.link}
      {...(props.download && { download: "CV_Mario_Luis" })}
      target="_blank"
      rel="noopener noreferrer"
      className="size-12 bt-secondary p-2 items-center justify-center"
    >
      {props.img && (
        <img
          draggable={false}
          src={props.img}
          className={`"size-max" ${props.invert ? "invert" : ""}`}
        />
      )}
      {props.name && <p className="text-black">{props.name}</p>}
    </a>
  );
};
export default ButtonLink;
