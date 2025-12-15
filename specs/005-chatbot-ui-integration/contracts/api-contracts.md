# API Contracts: Chatbot UI Integration

## Frontend to Backend API Contract

### Query Endpoint
- **Method**: POST
- **Path**: `/query`
- **Base URL**: `http://localhost:8000` (FastAPI backend)

#### Request Schema
```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "The user's question/query to send to the RAG system",
      "example": "What are ROS2 concepts?"
    },
    "top_k": {
      "type": "number",
      "description": "Number of top results to retrieve (optional)",
      "default": 5,
      "minimum": 1,
      "maximum": 20
    },
    "temperature": {
      "type": "number",
      "description": "Temperature setting for response generation (optional)",
      "default": 0.7,
      "minimum": 0,
      "maximum": 1
    }
  },
  "required": ["query"],
  "additionalProperties": false
}
```

#### Success Response Schema
```json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "enum": [true]
    },
    "data": {
      "type": "object",
      "properties": {
        "answer": {
          "type": "string",
          "description": "The AI-generated response to the query"
        },
        "sources": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "content": {
                "type": "string"
              },
              "metadata": {
                "type": "object"
              },
              "similarity_score": {
                "type": "number"
              },
              "position": {
                "type": "number"
              }
            }
          }
        },
        "confidence": {
          "type": "number",
          "description": "Confidence score for the response"
        },
        "processing_time": {
          "type": "number",
          "description": "Time taken to process the request in seconds"
        },
        "tokens_used": {
          "type": "object",
          "properties": {
            "input_tokens": {
              "type": "number"
            },
            "output_tokens": {
              "type": "number"
            },
            "total_tokens": {
              "type": "number"
            }
          }
        },
        "timestamp": {
          "type": "string",
          "format": "date-time",
          "description": "ISO timestamp of the response"
        }
      },
      "required": ["answer", "sources", "confidence", "processing_time", "tokens_used", "timestamp"]
    },
    "error": {
      "type": "null"
    },
    "request_id": {
      "type": "string",
      "description": "Unique identifier for the request"
    }
  },
  "required": ["success", "data", "error", "request_id"]
}
```

#### Error Response Schema
```json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "enum": [false]
    },
    "data": {
      "type": "null"
    },
    "error": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "description": "Type of error that occurred"
        },
        "message": {
          "type": "string",
          "description": "Human-readable error message"
        },
        "details": {
          "type": "object",
          "description": "Additional error details (optional)"
        }
      },
      "required": ["type", "message"]
    },
    "request_id": {
      "type": "string",
      "description": "Unique identifier for the request"
    }
  },
  "required": ["success", "data", "error", "request_id"]
}
```

## Frontend Component APIs

### ChatSession Component API
```javascript
interface ChatSessionProps {
  // Optional initial state
  initialState?: {
    isOpen: boolean;
    messages: ChatMessage[];
  };
}

interface ChatSessionHandle {
  // Methods to control the chat session from parent components
  open: () => void;
  close: () => void;
  toggle: () => void;
  clear: () => void;
}
```

### ChatMessage Component API
```javascript
interface ChatMessageProps {
  message: ChatMessage;
  // Additional display options
  showTimestamp?: boolean;
  highlight?: boolean;
}
```

### ChatInput Component API
```javascript
interface ChatInputProps {
  // Callback when user submits a message
  onSubmit: (message: string) => void;
  // Whether the input should be disabled (e.g., during loading)
  disabled?: boolean;
  // Placeholder text for the input field
  placeholder?: string;
}
```