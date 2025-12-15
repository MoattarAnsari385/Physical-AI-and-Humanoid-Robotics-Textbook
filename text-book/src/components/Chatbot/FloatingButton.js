import React from 'react';
import { FaComment } from 'react-icons/fa';
import styles from './styles/FloatingButton.module.css';

/**
 * Floating chat button component that remains visible while scrolling
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {boolean} [props.isOpen=false] - Whether the chat window is currently open
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 */
const FloatingButton = ({ onClick, isOpen = false, disabled = false }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className={`${styles.floatingButton} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      aria-expanded={isOpen}
      disabled={disabled}
      tabIndex={0}
    >
      <FaComment className={styles.icon} aria-hidden="true" />
    </button>
  );
};

export default FloatingButton;