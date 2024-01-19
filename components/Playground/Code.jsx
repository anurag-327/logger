import { CodeBlock, CopyBlock, github } from "react-code-blocks";
const Code = ({ code, heading }) => {
  return (
    <div className="flex flex-col mt-4 border rounded-t-md">
      <div className="flex items-center px-6 py-4 border-b text-zinc-500 bg-gray-50 rounded-t-md">
        {heading}
      </div>
      <div className="py-4 overflow-auto bg-white">
        <CopyBlock
          text={code}
          language="javascript"
          showLineNumbers={true}
          theme={github}
          CodeBlock
        />
      </div>
    </div>
  );
};

export default Code;
