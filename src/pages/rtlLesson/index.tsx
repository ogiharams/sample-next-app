import React from "react";
import { Button } from "./Button";
import RenderInput from "./RenderInput";
import FrameworkList from "./FrameworkList";
import UseEffectRender from "./UseEffectRender";
import MockServer from "./MockServer";
import Redux from "./Redux";
import SelectBox from "./selectBox";

const index = () => {
  const data = [
    {
      id: 1,
      item: "React",
    },
    {
      id: 2,
      item: "Anguler",
    },
    {
      id: 3,
      item: "Vue",
    },
  ];
  const outputConsole = (text) => {
    console.log(text);
  };
  return (
    <>
      <Button />
      <RenderInput outputConsole={outputConsole} />
      <FrameworkList frameworks={data} />
      <FrameworkList />
      <UseEffectRender />
      <MockServer />
      <Redux />
      <SelectBox />
    </>
  );
};

export default index;
