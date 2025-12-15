import React, { useEffect, useRef, useCallback } from 'react';
import Message from './Message';
import Input from './Input';
import styles from './styles/Window.module.css';
import { ANIMATION_DURATION } from '../../config';
import { createFocusTrap, announceToScreenReader } from './Accessibility';

/**
 * Chat window component that displays the conversation
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the chat window is open
 * @param {Array} props.messages - Array of message objects to display
 * @param {Function} props.onClose - Function to call when close button is clicked
 * @param {Function} props.onSend - Function to call when message is sent
 * @param {boolean} [props.isLoading=false] - Whether the chat is in a loading state
 * @param {string} [props.initialMessage="Hello! How can I assist you today?"] - Initial message to display
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 */
const Window = ({
  isOpen,
  messages,
  onClose,
  onSend,
  isLoading = false,
  initialMessage = "Hello! How can I assist you today?",
  disabled = false
}) => {
  const messagesEndRef = useRef(null);
  const windowRef = useRef(null);
  const cleanupFocusTrap = useRef(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Set up focus trap when window opens
  useEffect(() => {
    if (isOpen && windowRef.current) {
      cleanupFocusTrap.current = createFocusTrap(windowRef.current);
      announceToScreenReader("Chat window opened. Press escape to close.");
    } else if (cleanupFocusTrap.current) {
      cleanupFocusTrap.current();
      cleanupFocusTrap.current = null;
    }

    return () => {
      if (cleanupFocusTrap.current) {
        cleanupFocusTrap.current();
        cleanupFocusTrap.current = null;
      }
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Add initial message if there are no messages yet
  const displayMessages = messages.length === 0 && isOpen
    ? [{ id: 'initial', content: initialMessage, sender: 'system', timestamp: new Date() }]
    : messages;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.window}
      ref={windowRef}
      style={{ animation: `slideIn ${ANIMATION_DURATION}ms ease-out` }}
      role="dialog"
      aria-modal="true"
      aria-label="AI Assistant Chat"
      aria-hidden={!isOpen}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>AI Assistant</h3>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close chat"
          tabIndex={isOpen ? 0 : -1}
        >
          ×
        </button>
      </div>

      <div
        className={styles.messagesContainer}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {displayMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            showTimestamp={false}
          />
        ))}
        {isLoading && (
          <div className={styles.loadingIndicator} aria-label="Loading response">
            <div className={styles.loadingDots}>
              <span aria-hidden="true">.</span>
              <span aria-hidden="true">.</span>
              <span aria-hidden="true">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <Input
        onSend={onSend}
        disabled={disabled || isLoading}
      />
    </div>
  );
};

export default Window;