import React from "react";
import { Input } from "antd";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  classname: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onblur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const CustomInput = (props: Props) => {
  return (
    <div>
      <Input
        type={props.type}
        name={props.name}
        className={`form-control ${props.classname}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onchange}
        onBlur={props.onchange}
      />
    </div>
  );
};

export default CustomInput;
