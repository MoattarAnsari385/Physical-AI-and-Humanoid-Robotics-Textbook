import React from 'react';
import styles from './styles/Message.module.css';

/**
 * Component to display individual chat messages
 * @param {Object} props - Component props
 * @param {Object} props.message - The message object
 * @param {string} props.message.id - Unique identifier for the message
 * @param {string} props.message.content - The message content
 * @param {string} props.message.sender - Sender type: 'user' or 'system'
 * @param {Date} props.message.timestamp - When the message was created
 * @param {string} [props.message.status] - Status for user messages: 'pending', 'sent', 'received', 'error'
 * @param {boolean} [props.showTimestamp=false] - Whether to show the timestamp
 * @param {boolean} [props.highlight=false] - Whether to highlight the message
 */
const Message = ({ message, showTimestamp = false, highlight = false }) => {
  const { content, sender, timestamp, status } = message;

  // Determine CSS classes based on sender and status
  const messageClasses = [
    styles.message,
    styles[sender],
    status && styles[status],
    highlight && styles.highlight
  ].filter(Boolean).join(' ');

  // Format timestamp if needed
  const formattedTime = showTimestamp && timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div className={messageClasses}>
      <div className={styles.content}>
        {content}
      </div>
      {(showTimestamp || status === 'pending') && (
        <div className={styles.meta}>
          {formattedTime && <span className={styles.timestamp}>{formattedTime}</span>}
          {status === 'pending' && <span className={styles.status}>Sending...</span>}
          {status === 'error' && <span className={styles.statusError}>Failed to send</span>}
        </div>
      )}
    </div>
  );
};

export default Message;