import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, Paper, Typography } from '@mui/material';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            console.log(input);
            setTimeout(() => {
                setMessages(messages => [...messages, { text: "Hello World", sender: 'bot' }]);
            }, 500);
        }
        setInput('');
    };

    return (
        <Paper style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <List style={{ overflowY: 'auto', flexGrow: 1, padding: 0 }}>
                {messages.map((message, index) => (
                    <ListItem key={index} style={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', padding: '8px 20px' }}>
                        <Box
                            sx={{
                                maxWidth: '70%',
                                padding: '10px 15px',
                                backgroundColor: message.sender === 'user' ? "#556cd6" : '#f0f0f0',
                                color: message.sender === 'user' ? 'white' : 'black',
                                borderRadius: '20px',
                                textAlign: 'left',
                            }}
                        >
                            <Typography variant="body1">{message.text}</Typography>
                        </Box>
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
