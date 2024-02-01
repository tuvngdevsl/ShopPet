import React from "react";
import "./GlobalStyles.scss";

type Props = {
  children: React.ReactElement;
};

const GlobalStyles = (props: Props) => {
  return props.children;
};

export default GlobalStyles;
