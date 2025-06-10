import { Button, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

function Notfound() {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image src="/404.svg" alt="Vercel Logo" width={800} height={800} />
      <Button variant="contained" href="/">Go Home Here!</Button>
    </Grid>
  );
}

export default Notfound;
