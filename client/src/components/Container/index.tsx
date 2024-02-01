import React from "react";

type Props = {
  class1: string;
  children: React.ReactNode;
};

const Container = (props: Props) => {
  return (
    <section className={props.class1}>
      <div className="container-xxl">{props.children}</div>
    </section>
  );
};

export default Container;
