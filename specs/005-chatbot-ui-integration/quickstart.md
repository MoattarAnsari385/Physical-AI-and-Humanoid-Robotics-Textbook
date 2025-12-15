# Quickstart Guide: Chatbot UI Integration

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Step 1: Start Backend Service
```bash
# Navigate to backend directory
cd backend

# Start the FastAPI RAG backend
python -m uvicorn rag_agent.main:app --host 0.0.0.0 --port 8000
```

### Step 2: Configure Backend CORS (if not already done)
Ensure the backend allows requests from the frontend by adding CORS middleware in `backend/rag_agent/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Docusaurus default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Step 3: Install Frontend Dependencies
```bash
# Navigate to frontend directory
cd text-book

# Install required dependencies
npm install react-icons
```

### Step 4: Start Frontend Development Server
```bash
# In the text-book directory
npm start
```

## Manual Testing Steps

### Test 1: Floating Button Functionality
1. Navigate to any book page in your browser (e.g., http://localhost:3000)
2. Look for the floating chat button in the bottom-right corner
3. Verify it has the gradient background: `linear-gradient(135deg, #00b894 0%, #0055cc 100%)`
4. Verify it has a white chat icon
5. Scroll the page up and down to ensure the button remains fixed in position

### Test 2: Open/Close Functionality
1. Click the floating chat button
2. Verify the chat window opens with smooth animation (under 300ms)
3. Verify the initial message "Hello! How can I assist you today?" appears
4. Click the floating button again
5. Verify the chat window closes with smooth animation

### Test 3: Query-Response Flow
1. With the chat window open, type a question in the input field (e.g., "What are ROS2 concepts?")
2. Click the send icon (which should have the same gradient styling as the main button)
3. Verify your message appears in the chat window
4. Wait for the response from the backend
5. Verify the AI response appears in the chat window with proper formatting
6. Verify the response comes from the RAG system and is relevant to the question

### Test 4: Error Handling
1. Stop the backend service temporarily
2. Try to send a query through the chat interface
3. Verify an appropriate error message is displayed to the user
4. Restart the backend service
5. Try sending a query again and verify normal functionality resumes

### Test 5: Multiple Queries
1. Send multiple queries in succession
2. Verify each query and response appears in the correct order
3. Verify the system doesn't allow sending multiple queries simultaneously
4. Verify the loading state is properly displayed during backend processing

## Common Issues and Solutions

### Issue: CORS Errors
**Symptoms**: Network errors when sending queries to backend
**Solution**: Ensure CORS middleware is properly configured in the FastAPI backend

### Issue: Button Not Visible
**Symptoms**: Floating chat button doesn't appear on pages
**Solution**: Verify the component is properly integrated into the Docusaurus Layout

### Issue: Slow Response Times
**Symptoms**: Backend responses taking longer than 10 seconds
**Solution**: Check backend performance and ensure the RAG system is properly configured

### Issue: Styling Conflicts
**Symptoms**: Chat interface doesn't match the specified gradient theme
**Solution**: Verify CSS modules are properly applied and not overridden by Docusaurus styles