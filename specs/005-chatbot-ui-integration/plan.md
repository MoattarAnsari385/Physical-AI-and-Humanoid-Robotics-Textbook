# Implementation Plan: Chatbot UI Integration

**Feature**: 005-chatbot-ui-integration (specs/005-chatbot-ui-integration/spec.md)
**Created**: 2025-12-15
**Status**: Draft
**Author**: Claude

## Technical Context

### Frontend Environment
- **Framework**: Docusaurus (React-based)
- **Directory**: `text-book`
- **Component System**: React components with potential CSS modules
- **Styling**: CSS with potential integration with Docusaurus theme

### Backend Environment
- **Framework**: FastAPI
- **Directory**: `backend`
- **API Endpoint**: `/query` (POST) for RAG system
- **Response Format**: JSON with success/error status, answer, sources, confidence

### Integration Points
- **Frontend-Backend Communication**: HTTP JSON requests to `http://localhost:8000/query`
- **UI Placement**: Needs to be integrated into Docusaurus layout to appear on all pages
- **Styling System**: Must integrate with existing Docusaurus styling while maintaining specified gradient theme

### Unknowns (RESOLVED)
- Docusaurus theme components: Chatbot will be integrated into the main Layout component to appear on all pages
- CSS framework/styling system: Docusaurus uses CSS modules with support for gradient styling and animations
- API service utilities: No existing utilities detected, will implement fetch API wrapper
- Icon library: Will use React Icons library for chat and send icons

## Constitution Check

### AI-Native Authoring Compliance
- This UI integration will leverage AI-assisted development tools as per principle
- The chatbot component itself will enhance AI-native authoring by providing contextual help to readers

### Technical Accuracy in Robotics
- The UI will accurately reflect the RAG system's capabilities without overstating functionality
- Integration will maintain technical accuracy in displaying responses from the backend

### Academic Excellence for Engineering Learners
- UI design will be intuitive for university-level engineering students
- The chatbot will provide clear, educational responses related to robotics content

### Practical Hands-On Guidance
- The UI will provide practical access to robotics knowledge from the textbook
- Integration will be tested and reproducible in the expected environment

### Modular and Reusable Structure
- Components will be designed in a modular fashion for potential reuse
- The chatbot UI will follow the modular structure of the textbook

### Educational Technology Integration
- Implementation will integrate with Docusaurus-based book framework
- UI will be compatible with GitHub Pages hosting requirements

## Gates

### Gate 1: Technical Feasibility ✅
- Docusaurus supports custom React components
- FastAPI provides appropriate API endpoints for integration
- HTTP communication between frontend and backend is standard practice

### Gate 2: Design Consistency ✅
- Gradient styling can be implemented with CSS
- Floating button pattern is standard UI pattern
- Animation requirements are achievable with CSS/JS

### Gate 3: Architecture Alignment ✅
- Frontend-backend separation is maintained
- HTTP JSON communication aligns with architecture
- Component-based approach follows React/Docusaurus patterns

## Phase 0: Research

### Research Findings

#### Docusaurus Component Integration
- Docusaurus allows custom components through swizzling or theme components
- Chatbot can be integrated into the main Layout component to appear on all pages
- Custom CSS can be added via CSS modules or global styles

#### Styling System
- Docusaurus uses CSS modules by default
- Custom styles can be added to override default theme
- Gradient backgrounds and animations are supported via CSS

#### HTTP Request Handling
- Docusaurus projects typically use fetch API or axios for HTTP requests
- No existing API utilities detected, will implement basic fetch wrapper
- CORS setup needed in FastAPI backend for localhost:3000

#### Icon Options
- Docusaurus commonly uses Font Awesome or Material Icons
- React Icons library is commonly used with React/Docusaurus
- SVG icons can be implemented directly if needed

### Technology Decisions
- **Component Placement**: Integrate into `text-book/src/theme/Layout/index.js` to ensure presence on all pages
- **Styling**: Use CSS modules with inline styles for gradient effects
- **HTTP Client**: Implement fetch API with async/await for backend communication
- **Icons**: Use React Icons library for chat and send icons

## Phase 1: Design & Contracts

### Data Model

#### ChatMessage Entity
- **id**: string (unique identifier)
- **content**: string (message content)
- **sender**: enum (user|system) - who sent the message
- **timestamp**: Date (when message was created)
- **status**: enum (pending|sent|received|error) - for user messages

#### ChatSession Entity
- **isOpen**: boolean (whether chat window is open)
- **messages**: array of ChatMessage (conversation history)
- **isLoading**: boolean (whether waiting for backend response)
- **error**: string (any error message)
- **lastInteraction**: Date (timestamp of last user interaction)

### API Contract

#### Request Schema (Frontend → Backend)
```json
{
  "query": "string (user's question)",
  "top_k": "number (optional, default: 5)",
  "temperature": "number (optional, default: 0.7)"
}
```

#### Response Schema (Backend → Frontend)
```json
{
  "success": "boolean (whether request was successful)",
  "data": {
    "answer": "string (AI response)",
    "sources": "array of objects (source documents)",
    "confidence": "number (confidence score)",
    "processing_time": "number (time taken in seconds)",
    "tokens_used": {
      "input_tokens": "number",
      "output_tokens": "number",
      "total_tokens": "number"
    },
    "timestamp": "string (ISO date string)"
  },
  "error": {
    "type": "string (error type)",
    "message": "string (error message)",
    "details": "object (optional error details)"
  },
  "request_id": "string (unique request identifier)"
}
```

#### Error Response Schema
```json
{
  "success": false,
  "data": null,
  "error": {
    "type": "string",
    "message": "string",
    "details": "object (optional)"
  },
  "request_id": "string"
}
```

### Frontend API Service Contract
```javascript
// text-book/src/services/chatbot-api.js

interface ChatbotAPI {
  /**
   * Sends a query to the RAG backend
   * @param query - The user's question
   * @param options - Additional options for the query
   * @returns Promise resolving to backend response
   */
  query(query: string, options?: QueryOptions): Promise<BackendResponse>;
}

interface QueryOptions {
  top_k?: number;
  temperature?: number;
}

interface BackendResponse {
  success: boolean;
  data: ResponseData | null;
  error: ErrorData | null;
  request_id: string;
}
```

## Quickstart Guide

### Development Setup

1. **Start Backend Service**
   ```bash
   cd backend
   python -m uvicorn rag_agent.main:app --host 0.0.0.0 --port 8000
   ```

2. **Configure CORS in Backend** (if not already done)
   ```python
   # In backend/rag_agent/main.py
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],  # Docusaurus default
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd text-book
   npm install react-icons  # For chat and send icons
   ```

4. **Start Frontend Development Server**
   ```bash
   cd text-book
   npm start
   ```

### Manual Testing Steps

1. **Floating Button Test**
   - Navigate to any book page
   - Verify floating chat button appears in bottom-right corner
   - Scroll page to ensure button remains fixed
   - Verify gradient styling and white chat icon

2. **Open/Close Functionality Test**
   - Click floating button to open chat window
   - Verify smooth animation (under 300ms)
   - Verify initial message "Hello! How can I assist you today?" appears
   - Click button again to close window
   - Verify window closes with smooth animation

3. **Query-Response Test**
   - Type a question in the input field (e.g., "What are ROS2 concepts?")
   - Click send icon
   - Verify your message appears in the chat
   - Wait for response from backend
   - Verify AI response appears with proper formatting
   - Verify send icon has same gradient styling as main button

4. **Error Handling Test**
   - Stop the backend service temporarily
   - Try to send a query
   - Verify appropriate error message is shown
   - Restart backend service
   - Verify normal functionality resumes

## Implementation Tasks

1. **Create API Service Module**
   - File: `text-book/src/services/chatbot-api.js`
   - Implement HTTP client for communicating with FastAPI backend
   - Add error handling and request/response validation

2. **Create Chat Message Component**
   - File: `text-book/src/components/Chatbot/Message.js`
   - Implement display for user vs system messages
   - Add proper styling to distinguish message types
   - Handle message content formatting

3. **Create Chat Input Component**
   - File: `text-book/src/components/Chatbot/Input.js`
   - Implement text input field with send icon
   - Add gradient styling for send button
   - Handle submission via icon click

4. **Create Chat Window Component**
   - File: `text-book/src/components/Chatbot/Window.js`
   - Implement chat window container with header
   - Add message history display area
   - Implement smooth open/close animation
   - Display initial greeting message

5. **Create Floating Button Component**
   - File: `text-book/src/components/Chatbot/FloatingButton.js`
   - Implement fixed-position floating button
   - Add gradient background styling
   - Add white chat icon
   - Handle click to toggle chat window

6. **Create Main Chat Session Component**
   - File: `text-book/src/components/Chatbot/Session.js`
   - Manage overall chat state (open/closed, messages, loading)
   - Coordinate between sub-components
   - Handle API communication flow

7. **Add CSS Modules for Styling**
   - Files: `text-book/src/components/Chatbot/styles/*.module.css`
   - Create separate CSS modules for each component
   - Implement gradient styling as specified
   - Add animation effects for open/close

8. **Integrate into Docusaurus Layout**
   - File: `text-book/src/theme/Layout/index.js` (or similar)
   - Add chatbot component to main layout
   - Ensure component appears on all pages

9. **Configure Backend CORS**
   - File: `backend/rag_agent/main.py`
   - Add CORS middleware to allow requests from localhost:3000

10. **Add Accessibility Features**
    - Implement proper ARIA labels
    - Add keyboard navigation support
    - Ensure sufficient color contrast

## Risk Analysis

### Technical Risks
- **CORS Issues**: Backend may block requests from frontend - mitigate by configuring CORS middleware
- **Performance Impact**: Floating component may affect page performance - mitigate by optimizing rendering
- **CSS Conflicts**: New styles may conflict with existing Docusaurus styles - mitigate by using CSS modules

### Integration Risks
- **Docusaurus Version Compatibility**: Component integration may vary with Docusaurus version - mitigate by testing with current version
- **Backend Availability**: Backend may be down during development - mitigate by implementing graceful error handling

### UX Risks
- **Intrusive UI**: Floating button may distract from reading - mitigate by ensuring subtle but accessible design
- **Mobile Responsiveness**: Component may not work well on mobile - mitigate by implementing responsive design

## Success Metrics

### Technical Metrics
- Floating chat button loads within 1 second of page load (SC-001)
- Chat window opens and closes with smooth animation (under 300ms) (SC-002)
- 90% of user queries receive a response within 10 seconds (SC-003)
- 95% success rate for query-response communication (SC-004)

### User Experience Metrics
- Chat interface has 99% uptime during page navigation and scrolling (SC-005)
- User satisfaction rating for chatbot accessibility is 4.0/5.0 or higher (SC-006)

## Rollout Plan

### Phase 1: Core Components
- Implement floating button with proper styling
- Create basic chat window structure
- Verify components render correctly in Docusaurus

### Phase 2: Interaction Logic
- Implement open/close toggle functionality
- Add initial message display
- Connect components with proper state management

### Phase 3: Backend Integration
- Connect to FastAPI backend
- Implement query-response flow
- Add error handling

### Phase 4: Polish & Testing
- Add animations and visual enhancements
- Implement accessibility features
- Perform comprehensive testing across browsers/devices