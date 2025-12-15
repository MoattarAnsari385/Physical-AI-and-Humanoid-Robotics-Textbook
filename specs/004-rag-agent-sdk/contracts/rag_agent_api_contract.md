# API Contract: RAG Agent Development Main Functions

## Overview
This document defines the expected interfaces for the main functions in the RAG agent implementation.

## API Endpoints

### 1. FastAPI Query Endpoint: `/query` (POST)
**Purpose**: Accept user queries and return agent-generated responses

**Request Body**:
```json
{
  "query": "string (required) - The user's question or query text",
  "top_k": "integer (optional) - Number of top results to retrieve (default: 5)",
  "temperature": "float (optional) - Temperature parameter for agent response (default: 0.7)"
}
```

**Response Body**:
```json
{
  "success": "boolean - Whether the request was processed successfully",
  "data": {
    "answer": "string - The agent's answer to the user's query",
    "sources": [
      {
        "id": "string - Unique identifier for the chunk in the vector database",
        "content": "string - The actual text content of the chunk",
        "metadata": "dict - Associated metadata (URL, source document, position, etc.)",
        "similarity_score": "float - Similarity score between query and chunk (0.0-1.0)",
        "position": "integer - Position in the ranked results (0-indexed)"
      }
    ],
    "confidence": "float - Confidence score for the response (0.0-1.0)",
    "processing_time": "float - Time taken to process the request in seconds",
    "tokens_used": {
      "input_tokens": "integer - Number of input tokens used",
      "output_tokens": "integer - Number of output tokens generated",
      "total_tokens": "integer - Total tokens used"
    },
    "timestamp": "datetime - When the response was generated"
  },
  "error": {
    "type": "string - Error type (e.g., 'retrieval_error', 'api_unavailable')",
    "message": "string - Human-readable error message",
    "details": "dict - Additional error details (optional)"
  },
  "request_id": "string - Unique identifier for the request for tracking purposes"
}
```

**Status Codes**:
- `200`: Successful response with agent answer
- `400`: Bad request (malformed query, invalid parameters)
- `500`: Internal server error (API failures, etc.)

## Internal Function Contracts

### 1. initialize_agent() -> OpenAI Agent Object
**Purpose**: Initialize and configure the OpenAI agent with necessary tools

**Parameters**: None
**Returns**: Configured OpenAI Agent object with retrieval tool attached

**Behavior**:
- Creates an OpenAI Assistant with appropriate model selection
- Attaches the Qdrant retrieval tool to the agent
- Sets up proper system instructions for grounded responses

### 2. create_retrieval_tool(query: str, top_k: int = 5) -> Callable
**Purpose**: Create a retrieval tool that wraps Qdrant similarity search

**Parameters**:
- `query` (str): The query text to embed and search for
- `top_k` (int): Number of top results to retrieve (default: 5)

**Returns**: Callable function that performs the retrieval operation

**Behavior**:
- Embeds the query using the same model as ingestion
- Performs similarity search in Qdrant collection
- Returns formatted results suitable for agent consumption
- Handles errors gracefully with appropriate fallbacks

### 3. inject_context_to_prompt(context_chunks: List[Dict], original_prompt: str) -> str
**Purpose**: Inject retrieved context into the agent prompt

**Parameters**:
- `context_chunks` (List[Dict]): List of retrieved context chunks with metadata
- `original_prompt` (str): The original prompt from the user

**Returns**: Modified prompt string with context injected

**Behavior**:
- Formats context chunks in a way that's digestible for the agent
- Maintains proper token limits to avoid exceeding model capacity
- Ensures the original query remains prominent in the context

### 4. validate_grounding(response: str, context_chunks: List[Dict]) -> bool
**Purpose**: Validate that the agent response is grounded in the provided context

**Parameters**:
- `response` (str): The agent's generated response
- `context_chunks` (List[Dict]): List of context chunks used to generate the response

**Returns**: Boolean indicating if the response is properly grounded

**Behavior**:
- Checks that response content is supported by information in context chunks
- Identifies potential hallucinations or unsupported claims
- Returns false if response contains information not present in context

### 5. format_json_response(answer: str, sources: List[Dict], confidence: float) -> Dict
**Purpose**: Format the final response as clean JSON following the defined schema

**Parameters**:
- `answer` (str): The agent's answer to the query
- `sources` (List[Dict]): List of source chunks used in the response
- `confidence` (float): Confidence score for the response

**Returns**: Dictionary following the API response schema

**Behavior**:
- Formats data according to the defined JSON schema
- Includes all required metadata fields
- Ensures consistent structure for client consumption