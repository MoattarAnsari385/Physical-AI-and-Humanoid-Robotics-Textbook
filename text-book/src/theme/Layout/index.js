import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatSession from '../../components/Chatbot/Session';

/**
 * Custom Layout wrapper that adds the chatbot to all pages
 */
export default function Layout(props) {
  // Always show the chatbot for testing
  const shouldShowChatbot = true;

  return (
    <>
      <OriginalLayout {...props} />
      {shouldShowChatbot && <ChatSession />}
    </>
  );
}