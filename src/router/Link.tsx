import React from "react";

import {useRouter} from "router/Router";
import styled from "styled-components";

interface Params {
  path: string;
  children: any;
}

const LinkA = styled.a`
  text-decoration: none;
  color: #333;
`

const Link = ({path, children}: Params) => {

  const {navigate} = useRouter();

  const goTo = (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <LinkA href={path} onClick={goTo}>{children}</LinkA>
  );
}

export default Link
