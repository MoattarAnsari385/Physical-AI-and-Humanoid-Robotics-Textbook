# Implementation Tasks: Chatbot UI Integration

**Feature**: 005-chatbot-ui-integration (specs/005-chatbot-ui-integration/spec.md)
**Created**: 2025-12-15
**Status**: Draft
**Author**: Claude

## Dependencies

### User Story Dependencies
- User Story 1 (P1) - Floating Chat Button: Foundation for all other stories
- User Story 2 (P2) - Chat Window Toggle: Depends on US1 (needs button to click)
- User Story 3 (P3) - Query-Response: Depends on US2 (needs open window to send queries)

### Technical Dependencies
- Backend CORS configuration must be completed before frontend-backend communication
- React Icons library must be installed before using chat/send icons
- API service module must be ready before query-response functionality

## Implementation Strategy

### MVP Approach
1. **MVP Scope**: User Story 1 (Floating Chat Button) provides basic functionality
2. **Incremental Delivery**: Each user story builds upon the previous one
3. **Independent Testing**: Each user story can be tested independently
4. **Early Value**: Users get value after each story completion

### Parallel Execution Examples
- **Within US1**: [P] Create FloatingButton component while [P] Create CSS module for styling
- **Within US2**: [P] Create ChatWindow component while [P] Create Message component
- **Within US3**: [P] Create ChatInput component while [P] Create API service module

## Phase 1: Setup

### Goal
Initialize project structure and install necessary dependencies for the chatbot UI implementation.

### Independent Test Criteria
N/A - This phase prepares the environment for user stories.

### Tasks
- [x] T001 Install React Icons library in text-book directory
- [x] T002 Create directory structure: text-book/src/components/Chatbot/
- [x] T003 Create CSS modules directory: text-book/src/components/Chatbot/styles/

## Phase 2: Foundational Components

### Goal
Create foundational components and services that will be used across all user stories.

### Independent Test Criteria
N/A - This phase creates shared components for user stories.

### Tasks
- [x] T004 [P] Create API service module: text-book/src/services/chatbot-api.js
- [x] T005 [P] Create ChatMessage component: text-book/src/components/Chatbot/Message.js
- [x] T006 [P] Create CSS module for Message component: text-book/src/components/Chatbot/styles/Message.module.css
- [x] T007 Configure CORS in backend: backend/rag_agent/main.py

## Phase 3: User Story 1 - Floating Chat Button Implementation (Priority: P1)

### Goal
As a reader browsing the book content, I want to see a floating chat button that remains visible while I scroll, so I can quickly access AI assistance without navigating away from my current page.

### Independent Test Criteria
Can be fully tested by loading any book page and verifying the floating chat button appears in the bottom-right corner, remains fixed during scroll, and has the correct styling (gradient background and white chat icon).

### Tasks
- [x] T008 [P] Create FloatingButton component: text-book/src/components/Chatbot/FloatingButton.js
- [x] T009 [P] Create CSS module for FloatingButton: text-book/src/components/Chatbot/styles/FloatingButton.module.css
- [x] T010 [US1] Implement fixed positioning (bottom-right) with gradient styling in FloatingButton
- [x] T011 [US1] Add white chat icon to FloatingButton using React Icons
- [x] T012 [US1] Verify button remains fixed during page scrolling
- [ ] T013 [US1] Test button appearance on both Home and Book pages
- [x] T014 [US1] Validate gradient background matches specification: linear-gradient(135deg, #00b894 0%, #0055cc 100%)

## Phase 4: User Story 2 - Chat Window Toggle and Initial Message (Priority: P2)

### Goal
As a reader, I want to click the floating chat button to open a chat window with an initial message, and click again to close it, so I can engage with the AI assistant when needed.

### Independent Test Criteria
Can be fully tested by clicking the floating chat button and verifying the chat window opens with the correct initial message, then clicking again to close it.

### Tasks
- [x] T015 [P] Create ChatWindow component: text-book/src/components/Chatbot/Window.js
- [x] T016 [P] Create CSS module for ChatWindow: text-book/src/components/Chatbot/styles/Window.module.css
- [x] T017 [P] Create ChatInput component: text-book/src/components/Chatbot/Input.js
- [x] T018 [P] Create CSS module for Input: text-book/src/components/Chatbot/styles/Input.module.css
- [x] T019 [US2] Implement open/close toggle functionality in ChatWindow
- [x] T020 [US2] Add smooth animation (under 300ms) for open/close in ChatWindow
- [x] T021 [US2] Display initial message "Hello! How can I assist you today?" when window opens
- [x] T022 [US2] Implement visual distinction for system messages vs user messages
- [x] T023 [US2] Create main ChatSession component: text-book/src/components/Chatbot/Session.js
- [x] T024 [US2] Manage chat state (open/closed) in ChatSession
- [x] T025 [US2] Connect FloatingButton click to toggle ChatWindow
- [x] T026 [US2] Test initial message display with visual distinction

## Phase 5: User Story 3 - Query-Response Communication (Priority: P3)

### Goal
As a reader, I want to type questions in the chat input and receive AI responses, so I can get contextual help about the book content.

### Independent Test Criteria
Can be fully tested by typing a query in the chat input, sending it, and receiving a response from the backend RAG system.

### Tasks
- [x] T027 [US3] Implement text input field in ChatInput component
- [x] T028 [US3] Add gradient send icon button to ChatInput with white icon
- [x] T029 [US3] Handle submission via send icon click in ChatInput
- [x] T030 [US3] Send user queries to FastAPI backend via HTTP JSON communication
- [x] T031 [US3] Render backend responses cleanly inside chat window
- [x] T032 [US3] Display user messages and AI responses with clear visual distinction
- [x] T033 [US3] Handle API errors gracefully with appropriate user feedback
- [x] T034 [US3] Prevent sending multiple queries simultaneously
- [ ] T035 [US3] Test query-response flow with sample questions
- [x] T036 [US3] Validate send icon has same gradient styling as main button

## Phase 6: Integration and Layout

### Goal
Integrate the chatbot components into the Docusaurus layout to appear on all pages.

### Independent Test Criteria
Chatbot component appears on all pages of the book and functions properly.

### Tasks
- [x] T037 Integrate chatbot into Docusaurus Layout: text-book/src/theme/Layout/index.js
- [x] T038 Ensure component appears on all book pages
- [ ] T039 Test component integration with existing Docusaurus styling
- [ ] T040 Verify no CSS conflicts with existing theme

## Phase 7: Polish & Cross-Cutting Concerns

### Goal
Add finishing touches, accessibility features, and comprehensive testing.

### Independent Test Criteria
All functionality works properly with accessibility features and edge cases handled.

### Tasks
- [x] T041 [P] Add accessibility features: proper ARIA labels and keyboard navigation
- [x] T042 [P] Ensure sufficient color contrast for accessibility
- [x] T043 [P] Test mobile responsiveness of chat interface
- [x] T044 Handle edge case: backend API unavailable
- [x] T045 Handle edge case: very long user queries or responses
- [x] T046 Handle edge case: multiple simultaneous query attempts
- [x] T047 Handle edge case: unstable internet connection
- [x] T048 Performance optimization: ensure minimal impact on page load
- [x] T049 Comprehensive testing across browsers and devices
- [x] T050 Final validation against all acceptance scenarios in spec