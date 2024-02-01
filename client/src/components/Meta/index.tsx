import { Helmet } from "react-helmet";

import React from "react";

interface MetaProps {
  title: string;
}

const Meta: React.FC<MetaProps> = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

export default Meta;
