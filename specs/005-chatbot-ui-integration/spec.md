# Feature Specification: Chatbot UI Integration

**Feature Branch**: `005-chatbot-ui-integration`
**Created**: 2025-12-15
**Status**: Draft
**Input**: User description: "Frontend–Backend Integration with Modern Embedded Chatbot UI for RAG System

Goal:
Integrate the FastAPI RAG backend with a fully modern, theme-consistent chatbot UI embedded in the Docusaurus frontend.

Target audience:
Readers of the book who need contextual AI assistance directly from the interface.

Focus:
A floating AI chatbot that visually and functionally matches modern production websites.

Success criteria:
- Floating chat button visible on both Home and Book pages
- Button fixed at bottom-right and remains static during scroll
- Button shape: circular or rounded-square
- Button background: linear-gradient(135deg, #00b894 0%, #0055cc 100%)
- Chat icon color: white with high contrast
- On click, a compact chat window opens with smooth animation
- Chat window UI follows the same gradient-based theme
- Automatic initial message on open:
  “Hello! How can I assist you today?”
- Input area includes a **send icon (not a text button)**
- Send icon uses the same gradient background and white icon
- Clicking “Ask AI” again closes the chatbot
- User queries are sent to the FastAPI backend
- Responses are rendered cleanly inside the chat window

Constraints:
- Frontend folder: `text-book`
- Backend folder: `backend`
- HTTP JSON communication
- Local development environment
- Custom UI implementation (no third-party chatbot widgets)

Not building:
- Authentication or user profiles
- Production deployment
- File uploads or voice input
- Persistent conversation storage"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Floating Chat Button Implementation (Priority: P1)

As a reader browsing the book content, I want to see a floating chat button that remains visible while I scroll, so I can quickly access AI assistance without navigating away from my current page.

**Why this priority**: This is the foundation of the feature - without an easily accessible chat button, users cannot engage with the AI assistance functionality.

**Independent Test**: Can be fully tested by loading any book page and verifying the floating chat button appears in the bottom-right corner, remains fixed during scroll, and has the correct styling (gradient background and white chat icon).

**Acceptance Scenarios**:

1. **Given** I am on any book page (Home or Book), **When** I load the page, **Then** I see a floating chat button in the bottom-right corner that stays fixed during scrolling
2. **Given** I am viewing a book page with the floating chat button, **When** I scroll the page, **Then** the button remains fixed in the bottom-right corner
3. **Given** I am on a book page, **When** I see the floating chat button, **Then** it has the specified gradient background (linear-gradient(135deg, #00b894 0%, #0055cc 100%)) and white chat icon

---

### User Story 2 - Chat Window Toggle and Initial Message (Priority: P2)

As a reader, I want to click the floating chat button to open a chat window with an initial message, and click again to close it, so I can engage with the AI assistant when needed.

**Why this priority**: This provides the core interaction flow that allows users to engage with the AI assistant.

**Independent Test**: Can be fully tested by clicking the floating chat button and verifying the chat window opens with the correct initial message, then clicking again to close it.

**Acceptance Scenarios**:

1. **Given** I am on a book page with the floating chat button visible, **When** I click the button, **Then** a compact chat window opens with smooth animation and displays "Hello! How can I assist you today?"
2. **Given** I have opened the chat window, **When** I click the floating chat button again, **Then** the chat window closes
3. **Given** the chat window is open, **When** I see the initial message, **Then** it appears as a system message with clear visual distinction

---

### User Story 3 - Query-Response Communication (Priority: P3)

As a reader, I want to type questions in the chat input and receive AI responses, so I can get contextual help about the book content.

**Why this priority**: This completes the core functionality by enabling actual communication between the user and the AI system.

**Independent Test**: Can be fully tested by typing a query in the chat input, sending it, and receiving a response from the backend RAG system.

**Acceptance Scenarios**:

1. **Given** the chat window is open, **When** I type a query and click the send icon, **Then** my message appears in the chat and is sent to the backend
2. **Given** I have sent a query to the backend, **When** the response is received, **Then** it appears in the chat window with proper formatting
3. **Given** I am in the chat interface, **When** I see the send icon, **Then** it has the same gradient background and white icon as the main chat button

---

### Edge Cases

- What happens when the backend API is unavailable or returns an error?
- How does the system handle very long user queries or responses?
- What occurs if a user tries to send a query while another is still being processed?
- How does the system behave when the user has an unstable internet connection?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a floating chat button on all Home and Book pages in the bottom-right corner
- **FR-002**: System MUST keep the floating chat button fixed during page scrolling
- **FR-003**: System MUST apply the specified gradient background (linear-gradient(135deg, #00b894 0%, #0055cc 100%)) to the chat button
- **FR-004**: System MUST use a white chat icon with high contrast on the floating button
- **FR-005**: System MUST open a compact chat window with smooth animation when the floating button is clicked
- **FR-006**: System MUST display the initial message "Hello! How can I assist you today?" when the chat window opens
- **FR-007**: System MUST close the chat window when the floating button is clicked again
- **FR-008**: System MUST provide an input area with a send icon (not text button) for user queries
- **FR-009**: System MUST apply the same gradient background and white icon to the send button
- **FR-010**: System MUST send user queries to the FastAPI backend via HTTP JSON communication
- **FR-011**: System MUST render backend responses cleanly inside the chat window
- **FR-012**: System MUST display user messages and AI responses with clear visual distinction
- **FR-013**: System MUST handle API errors gracefully with appropriate user feedback
- **FR-014**: System MUST prevent sending multiple queries simultaneously

### Key Entities *(include if feature involves data)*

- **ChatMessage**: Represents a message in the conversation with type (user/system), content, and timestamp
- **ChatSession**: Represents the current chat interaction state including open/closed status and message history

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Floating chat button appears on all Home and Book pages within 1 second of page load
- **SC-002**: Chat window opens and closes with smooth animation (under 300ms) in 95% of interactions
- **SC-003**: 90% of user queries receive a response from the backend within 10 seconds
- **SC-004**: Users can successfully send queries and receive responses in 95% of attempts under normal network conditions
- **SC-005**: Chat interface has 99% uptime during page navigation and scrolling
- **SC-006**: User satisfaction rating for the chatbot accessibility is 4.0/5.0 or higher in user testing