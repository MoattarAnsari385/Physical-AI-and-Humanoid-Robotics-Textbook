# Embedding Pipeline for Physical AI & Humanoid Robotics Book

This project implements an embedding pipeline that extracts text from deployed Docusaurus URLs, generates embeddings using Cohere, and stores them in Qdrant for RAG-based retrieval.

## Features

- Discovers all URLs from a Docusaurus site (using sitemap.xml or crawling)
- Extracts clean text content while excluding navigation elements
- Chunks content into manageable pieces for embedding
- Generates high-quality embeddings using Cohere
- Stores embeddings in Qdrant vector database with metadata
- Includes error handling and retry mechanisms

## Requirements

- Python 3.11+
- UV package manager (optional, for dependency management)
- Cohere API key
- Qdrant instance (local or cloud)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PhysicalAI-and-Humanoid-Robotics-Book
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies:**
   ```bash
   # Using pip
   pip install -r requirements.txt

   # Or using uv (faster)
   uv pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   # Cohere API configuration
   COHERE_API_KEY=your_cohere_api_key_here

   # Qdrant configuration
   QDRANT_URL=your_qdrant_cluster_url_here  # Optional: leave empty for local instance
   QDRANT_API_KEY=your_qdrant_api_key_here  # Optional: leave empty for local instance
   ```

5. **Run the pipeline:**
   ```bash
   python main.py
   ```

## Configuration

- `CHUNK_SIZE`: Default chunk size in characters (default: 1000)
- `COHERE_MODEL`: Embedding model to use (default: "embed-multilingual-v3.0")
- `VECTOR_SIZE`: Dimension of the embedding vectors (default: 1024)

## Architecture

The pipeline consists of these main functions:

1. `get_all_urls()`: Discovers all accessible URLs from the target Docusaurus site
2. `extract_text_from_url()`: Extracts clean text content from a single URL
3. `chunk_text()`: Splits content into manageable chunks for embedding
4. `embed()`: Generates embeddings using Cohere's API
5. `create_collection()`: Creates the Qdrant collection if it doesn't exist
6. `save_chunk_to_qdrant()`: Stores embeddings with metadata in Qdrant
7. `main()`: Orchestrates the complete pipeline

## Target Site

This pipeline is configured to process: https://physical-ai-and-humanoid-robotics-t-seven.vercel.app/

## Error Handling

The pipeline includes robust error handling:
- Retry mechanisms with exponential backoff for API calls
- Graceful handling of inaccessible URLs
- Continuation of processing when individual pages fail
- Comprehensive logging for debugging

## Development

The code is organized in a single `main.py` file as requested, with clear function separation and comprehensive documentation.