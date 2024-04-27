import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);  // Create a ref for the scrolling operation

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();  // Scroll to bottom every time messages change
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            console.log(input);  // Logging user input to the console
            setTimeout(() => {
                setMessages(messages => [...messages, { text: "Hello World", sender: 'bot' }]);
            }, 500);  // Simulating a response delay
        }
        setInput('');
    };

    return (
        <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <List style={{ overflowY: 'auto', flexGrow: 1 }}>
                {messages.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={message.text}
                            style={{ textAlign: message.sender === 'bot' ? 'left' : 'right' }}
                        />
                    </ListItem>
                ))}
                <div ref={messagesEndRef} />
            </List>
            <Box component="div" style={{ display: 'flex', marginTop: 'auto' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Paper>
    );
}

export default Chatbot;
