import { useEffect, useState } from "react";
import version from "../../../package.json";
import { Typography, Link } from "@mui/material";
function Copyright(props: any) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          href="https://CareSphere.com/"
        >
          CareSphere
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        version : {version.version}
      </Typography>
    </>
  );
}

export default Copyright;
