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
      content: "Hi, I'm your travel assistant! How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const userMessage = message.trim();
    if (!userMessage) return; // Prevent sending empty messages

    setMessage("");  // Clear the input field
    setMessages((messages) => [
      ...messages,
      { role: "user", content: userMessage },  // Add the user's message to the chat
      { role: "assistant", content: "Typing..." },  // Add a placeholder for the assistant's response
    ]);

    try {
      // Send the message to the server
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),  // Send only the user's message
      });

      const data = await response.json();
      console.log('Response from API:', data);

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];  // Get the last message (assistant's placeholder)
        let otherMessages = messages.slice(0, messages.length - 1);  // Get all other messages
        return [
          ...otherMessages,
          { ...lastMessage, content: formatMessage(data.response) },  // Format and set the assistant's message
        ];
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((messages) => [
        ...messages.slice(0, messages.length - 1),  // Remove the placeholder
        { role: "assistant", content: "Error communicating with the server." },
      ]);
    }
  };

  const formatMessage = (message) => {
    // Remove unwanted characters and format the message
    return message
      .replace(/\\n/g, "\n")  // Replace newline characters
      .replace(/{"response":"|"}$/g, "")  // Remove JSON artifacts
      .trim();
  };

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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
