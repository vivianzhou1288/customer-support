"use client";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        overflow: "auto",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Typography variant="h3" align="center" sx={{ color: "black", mb: 2 }}>
          Welcome to Headstarter's AI Support
        </Typography>
        <Button>Sign In</Button>
      </Box>
      <Box
        sx={{
          width: "500px",
          height: "700px",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          p: 2,
          overflowY: "auto",
          mb: 2,
        }}
      >
        <Stack direction={"column"} spacing={2} flexGrow={1}>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius={16}
                p={2}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained">Send</Button>
        </Stack>
      </Box>
    </Box>
  );
}
