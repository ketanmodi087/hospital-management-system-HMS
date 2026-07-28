import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMagicLink = createAsyncThunk(
  "sendMagicLink",
  async (_request: any, { dispatch }) => {
    console.log("_request",_request);
    
    fetch("https://q5mmvkbhq1.execute-api.ap-southeast-1.amazonaws.com/prod/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _request.email,
      }),
    })
      .then((response) => {
        console.log("response", response);
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
);
