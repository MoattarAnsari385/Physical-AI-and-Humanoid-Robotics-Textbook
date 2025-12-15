# Data Model: Chatbot UI Integration

## Entities

### ChatMessage
Represents a single message in the chat conversation

**Fields**:
- `id` (string): Unique identifier for the message
- `content` (string): The text content of the message
- `sender` (enum: "user" | "system"): Indicates who sent the message
- `timestamp` (Date): When the message was created/sent
- `status` (enum: "pending" | "sent" | "received" | "error"): Status of the message (for user messages)

**Validation Rules**:
- `content` must be non-empty string
- `sender` must be either "user" or "system"
- `timestamp` must be a valid date
- `status` is only applicable to user messages

**Relationships**:
- Belongs to one ChatSession (parent relationship)

### ChatSession
Represents the current chat interaction state

**Fields**:
- `isOpen` (boolean): Whether the chat window is currently open
- `messages` (array of ChatMessage): The conversation history
- `isLoading` (boolean): Whether waiting for a backend response
- `error` (string | null): Any current error message
- `lastInteraction` (Date): Timestamp of last user interaction

**Validation Rules**:
- `messages` array length should not exceed 100 messages (for performance)
- `error` should be null when `isLoading` is false (unless persistent error state)

**State Transitions**:
- `isOpen` can transition from false to true (open chat) or true to false (close chat)
- `isLoading` can transition from false to true (when sending query) or true to false (when receiving response)
- `error` can be set when API call fails or cleared when new request is made

## API Data Structures

### Frontend Request to Backend
```json
{
  "query": "string",
  "top_k": "number (optional)",
  "temperature": "number (optional)"
}
```

**Validation**:
- `query` must be non-empty string
- `top_k` must be positive integer if provided (default: 5)
- `temperature` must be between 0 and 1 if provided (default: 0.7)

### Backend Response to Frontend
```json
{
  "success": "boolean",
  "data": {
    "answer": "string",
    "sources": "array of objects",
    "confidence": "number",
    "processing_time": "number",
    "tokens_used": {
      "input_tokens": "number",
      "output_tokens": "number",
      "total_tokens": "number"
    },
    "timestamp": "string (ISO date)"
  },
  "error": {
    "type": "string",
    "message": "string",
    "details": "object (optional)"
  },
  "request_id": "string"
}
```

**Validation**:
- If `success` is true, `data` must be present and `error` must be null
- If `success` is false, `error` must be present and `data` must be null
- `answer` must be non-empty string when success is true
- `request_id` must be unique for each request