# Quickstart: RAG Agent Development with OpenAI Agents SDK and FastAPI

## Prerequisites

- Python 3.11 or higher
- OpenAI API key
- Cohere API key (to match ingestion pipeline model)
- Qdrant API key and cluster URL (or local Qdrant instance)
- Existing embedded content in Qdrant collection named "rag_embedding"

## Setup

### 1. Navigate to Backend Directory
```bash
cd PhysicalAI-and-Humanoid-Robotics-Book/backend
```

### 2. Install Agent Dependencies
```bash
# Create requirements-agent.txt with agent-specific dependencies
echo "fastapi>=0.104.0
uvicorn>=0.24.0
openai>=1.10.0
cohere>=4.0.0
qdrant-client>=1.9.0
python-dotenv>=1.0.0
pydantic>=2.5.0
pytest>=7.0.0" > requirements-agent.txt

# Install with pip
pip install -r requirements-agent.txt
```

### 3. Environment Configuration
Ensure your `.env` file contains the necessary credentials:
```bash
# backend/.env
OPENAI_API_KEY=your_openai_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url_here  # or leave empty if using local instance
QDRANT_API_KEY=your_qdrant_api_key_here  # optional for local instance
```

## Running the RAG Agent

### 1. Start the FastAPI Service
```bash
cd backend
uvicorn rag_agent.main:app --reload --port 8000
```

### 2. Query the Agent
```bash
# Using curl
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the key concepts in ROS2?",
    "top_k": 5
  }'
```

### 3. Programmatic Access
```python
import requests

response = requests.post("http://localhost:8000/query", json={
    "query": "Explain how simulation works in robotics",
    "top_k": 3
})

result = response.json()
print(f"Answer: {result['data']['answer']}")
print(f"Sources: {len(result['data']['sources'])} chunks used")
```

## Expected Output
The RAG agent will:
1. Receive the user query via the FastAPI endpoint
2. Pass the query to the OpenAI Agent
3. Agent calls the Qdrant retrieval tool to get relevant context
4. Context is injected into the agent prompt
5. Agent generates a response grounded in the retrieved content
6. Clean JSON response is returned with answer and sources

## Verification
After running queries, verify:
- Agent responses are grounded in retrieved context (no hallucinations)
- Relevant content chunks are returned as sources
- Response time is under 5 seconds
- Clean JSON structure is returned

## Troubleshooting

### Common Issues:
- **API Rate Limits**: The agent includes error handling for rate limits
- **Missing Environment Variables**: Ensure all required .env variables are set
- **Qdrant Connection Issues**: Verify Qdrant URL and API keys are correct
- **Empty Results**: Check that the "rag_embedding" collection has been populated
- **OpenAI API Issues**: Verify OpenAI API key is valid and has sufficient credits

### Environment Variables:
Make sure all required environment variables are set:
- `OPENAI_API_KEY`: Required for agent functionality
- `COHERE_API_KEY`: Required for query embedding (must match ingestion model)
- `QDRANT_URL`: Required for remote Qdrant instance (optional for local)
- `QDRANT_API_KEY`: Required for remote Qdrant instance (optional for local)