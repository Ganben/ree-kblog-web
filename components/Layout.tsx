import React, { ReactNode } from "react";
import Header from "./Header";
import {Grid, Container} from "@mui/material";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  
  <Grid container height="100vh" alignItems="center" direction="column">

    <Header />
    <Container className="layout">{props.children}</Container>

  </Grid>
);

export default Layout;
