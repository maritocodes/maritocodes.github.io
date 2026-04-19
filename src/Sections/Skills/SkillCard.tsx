interface SkillCardInterface {
  img?: string;
  invert?: boolean;
  title: string;
}

const SkillCard = (props: SkillCardInterface) => {
  return (
    <div className="p-4 rounded-2xl w-full inline-flex items-center gap-2 justify-center shadow-inner-card">
      {props.img && <img src={props.img} alt="logo" className={`"w-8 h-8 object-contain p-2" ${props.invert ? '' : 'invert'} `} />}
      <p className="text-white text-xl font-bold whitespace-nowrap">{props.title}</p>
    </div>
  );
};
export default SkillCard;
