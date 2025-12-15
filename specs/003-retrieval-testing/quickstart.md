# Quickstart: Retrieval Pipeline Testing

## Prerequisites

- Python 3.11 or higher
- Existing embedded content in Qdrant collection named "rag_embedding"
- Cohere API key
- Qdrant API key and cluster URL (or local Qdrant instance)

## Setup

### 1. Navigate to Backend Directory
```bash
cd PhysicalAI-and-Humanoid-Robotics-Book/backend
```

### 2. Install Test Dependencies
```bash
# Install the existing backend dependencies if not already installed
pip install -r requirements.txt

# Install additional testing dependencies
pip install pytest python-levenshtein
```

Or create a separate requirements file for testing:
```bash
# Create requirements-test.txt
echo "pytest>=7.0.0
python-levenshtein>=0.2.0" > requirements-test.txt

# Install with pip
pip install -r requirements-test.txt
```

### 3. Environment Configuration
Ensure your `.env` file contains the necessary credentials:
```bash
# backend/.env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url_here  # or leave empty if using local instance
QDRANT_API_KEY=your_qdrant_api_key_here  # optional for local instance
```

## Running the Retrieval Tests

### 1. Basic Retrieval Test
```bash
cd backend
python retrieval_tester.py --query "your test query here" --top-k 5
```

### 2. Batch Testing with Multiple Queries
```bash
# Run the test module directly
python -m pytest test_retrieval.py -v
```

### 3. Programmatic Testing
```python
from retrieval_tester import run_retrieval_test

# Run a single test
result = run_retrieval_test(query_text="What is ROS2?", top_k=3)
print(f"Test accuracy: {result['overall_accuracy']}")
```

## Expected Output
The retrieval testing will:
1. Convert the input query to an embedding using the same model as ingestion
2. Perform similarity search in Qdrant to find top-k matches
3. Validate that retrieved content matches original source text
4. Verify metadata fields (URL, chunk_id) are correct
5. Return structured JSON output with validation results

## Verification
After running tests, verify:
- High similarity scores for relevant content
- Accurate metadata retrieval
- Proper content matching with original text
- Clean JSON output format

## Troubleshooting

### Common Issues:
- **API Rate Limits**: The pipeline includes basic error handling
- **Missing Environment Variables**: Ensure all required .env variables are set
- **Qdrant Connection Issues**: Verify Qdrant URL and API keys are correct
- **Empty Results**: Check that the "rag_embedding" collection has been populated

### Environment Variables:
Make sure all required environment variables are set:
- `COHERE_API_KEY`: Required for embedding generation
- `QDRANT_URL`: Required for remote Qdrant instance (optional for local)
- `QDRANT_API_KEY`: Required for remote Qdrant instance (optional for local)