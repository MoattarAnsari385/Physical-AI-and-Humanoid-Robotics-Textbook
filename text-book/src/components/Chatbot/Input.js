import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styles from './styles/Input.module.css';
import { MIN_MESSAGE_LENGTH, MAX_MESSAGE_LENGTH } from '../../config';

/**
 * Chat input component with send button
 * @param {Object} props - Component props
 * @param {Function} props.onSend - Function to call when message is sent
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {string} [props.placeholder="Type your message..."] - Placeholder text for the input
 */
const Input = ({ onSend, disabled = false, placeholder = "Type your message..." }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && inputValue.trim().length >= MIN_MESSAGE_LENGTH) {
      onSend(inputValue.trim());
      setInputValue('');

      // Focus back to textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInputValue(value);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const remainingChars = MAX_MESSAGE_LENGTH - inputValue.length;

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.textInput}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-label="Type your message"
          aria-required="true"
          aria-invalid={inputValue.trim().length < MIN_MESSAGE_LENGTH && inputValue.length > 0}
        />
        <button
          type="submit"
          className={`${styles.sendButton} ${disabled || inputValue.trim().length < MIN_MESSAGE_LENGTH ? styles.disabled : ''}`}
          disabled={disabled || inputValue.trim().length < MIN_MESSAGE_LENGTH}
          aria-label="Send message"
          aria-disabled={disabled || inputValue.trim().length < MIN_MESSAGE_LENGTH}
        >
          <FaPaperPlane className={styles.sendIcon} aria-hidden="true" />
        </button>
      </div>
      {inputValue.length > MAX_MESSAGE_LENGTH - 50 && (
        <div className={styles.charCount} aria-live="polite">
          {remainingChars} characters remaining
        </div>
      )}
    </form>
  );
};

export default Input;