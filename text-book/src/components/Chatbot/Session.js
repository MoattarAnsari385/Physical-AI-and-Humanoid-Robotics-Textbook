import React, { useState, useCallback } from 'react';
import FloatingButton from './FloatingButton';
import Window from './Window';
import Input from './Input';
import { queryBackend } from '../../services/chatbot-api';
import { DEFAULT_TOP_K, DEFAULT_TEMPERATURE } from '../../config';

/**
 * Main chat session component that manages the entire chat state
 */
const Session = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSend = useCallback(async (content) => {
    if (isLoading) return;

    // Add user message to the chat
    const userMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'pending'
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      // Update the message status to sent
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));

      // Query the backend
      const response = await queryBackend(content, {
        top_k: DEFAULT_TOP_K,
        temperature: DEFAULT_TEMPERATURE
      });

      if (response.success && response.data) {
        // Add AI response to the chat
        const aiMessage = {
          id: `ai-${Date.now()}`,
          content: response.data.answer,
          sender: 'system',
          timestamp: new Date(),
        };

        addMessage(aiMessage);
      } else {
        // Add error message
        const errorMessage = {
          id: `error-${Date.now()}`,
          content: response.error?.message || 'Sorry, I encountered an error processing your request.',
          sender: 'system',
          timestamp: new Date(),
        };

        addMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I encountered an error connecting to the AI service.',
        sender: 'system',
        timestamp: new Date(),
      };

      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addMessage]);

  return (
    <>
      <FloatingButton
        onClick={toggleChat}
        isOpen={isOpen}
        disabled={false}
      />
      <Window
        isOpen={isOpen}
        messages={messages}
        onClose={closeChat}
        onSend={handleSend}
        isLoading={isLoading}
        disabled={false}
      />
    </>
  );
};

export default Session;