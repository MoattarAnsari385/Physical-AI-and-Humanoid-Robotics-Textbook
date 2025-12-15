# Quickstart: Embedding Pipeline

## Prerequisites

- Python 3.11 or higher
- UV package manager
- Cohere API key
- Qdrant API key and cluster URL (or local Qdrant instance)

## Setup

### 1. Clone and Navigate to Project
```bash
# You should already be in the project directory
cd PhysicalAI-and-Humanoid-Robotics-Book
```

### 2. Create Backend Directory
```bash
mkdir -p backend
cd backend
```

### 3. Install Dependencies with UV
```bash
uv init
uv add cohere qdrant-client requests beautifulsoup4 python-dotenv
```

Or if you prefer to create a requirements.txt first:
```bash
# Create requirements.txt
echo "cohere>=4.0.0
qdrant-client>=1.9.0
requests>=2.31.0
beautifulsoup4>=4.12.0
python-dotenv>=1.0.0" > requirements.txt

# Install with pip (or use uv pip install)
pip install -r requirements.txt
```

### 4. Environment Configuration
Create a `.env` file in the backend directory:
```bash
# backend/.env
COHERE_API_KEY=your_cohere_api_key_here
QDRANT_URL=your_qdrant_cluster_url_here  # or leave empty if using local instance
QDRANT_API_KEY=your_qdrant_api_key_here  # optional for local instance
```

## Running the Embedding Pipeline

### 1. Prepare the main.py file
Create the main.py file with all required functions as specified in the requirements.

### 2. Execute the Pipeline
```bash
cd backend
python main.py
```

## Expected Output
The pipeline will:
1. Discover all URLs from the target Docusaurus site (https://physical-ai-and-humanoid-robotics-t-seven.vercel.app/)
2. Extract clean text content from each page
3. Chunk the content into manageable pieces
4. Generate embeddings using Cohere
5. Create a "rag_embedding" collection in Qdrant if it doesn't exist
6. Store all embeddings with associated metadata

## Verification
After execution, you can verify the embeddings were stored by checking the Qdrant collection or running a test similarity search.

## Troubleshooting

### Common Issues:
- **API Rate Limits**: The pipeline includes retry mechanisms, but ensure you have appropriate API plan limits
- **URL Discovery**: If sitemap.xml is not available, the crawler will attempt to discover pages through navigation
- **Memory Usage**: Large documents are processed in chunks to manage memory efficiently

### Environment Variables:
Make sure all required environment variables are set:
- `COHERE_API_KEY`: Required for embedding generation
- `QDRANT_URL`: Required for remote Qdrant instance (optional for local)
- `QDRANT_API_KEY`: Required for remote Qdrant instance (optional for local)