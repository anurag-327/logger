import { Globe, Link, LinkSimpleHorizontal } from "phosphor-react";

const Card = ({ project }) => {
  return (
    <a
      className="flex w-full  flex-col sm:w-[300px] overflow-hidden gap-2  shadow-gray-300 hover:shadow-lg shadow-sm border transition duration-150 items-start p-3  rounded-md"
      href={`project/${project.id}`}
    >
      <span className="font-[500] ">{project.name}</span>
      <span className="flex gap-2 text-sm">
        <Globe size={20} color="#0000ff" /> {project.count}
      </span>
      <span className="flex w-full gap-2 overflow-hidden text-sm">
        <LinkSimpleHorizontal size={20} color="#808080" />
        {project.projectURL}
      </span>

      <p className="px-2 py-2 text-sm underline">Configure Project</p>
    </a>
  );
};

export default Card;
