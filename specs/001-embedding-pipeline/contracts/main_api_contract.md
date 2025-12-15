# API Contract: Embedding Pipeline Main Functions

## Overview
This document defines the expected interfaces for the main functions in the embedding pipeline implementation.

## Function Definitions

### 1. get_all_urls(base_url: str) -> List[str]
**Purpose**: Discover and return all accessible URLs from a Docusaurus site

**Parameters**:
- `base_url` (str): The base URL of the Docusaurus site to crawl

**Returns**:
- `List[str]`: List of all discovered URLs from the site

**Behavior**:
- If sitemap.xml is available, parse it to discover URLs
- If no sitemap, perform a limited crawl of the site
- Return only URLs that are part of the same domain
- Handle HTTP errors gracefully and continue processing

### 2. extract_text_from_url(url: str) -> Dict[str, str]
**Purpose**: Extract clean text content from a single URL

**Parameters**:
- `url` (str): The URL to extract text from

**Returns**:
- `Dict[str, str]`: Dictionary containing:
  - `title` (str): The page title
  - `content` (str): The cleaned text content
  - `url` (str): The original URL (for reference)

**Behavior**:
- Remove navigation elements, headers, footers, and other non-content elements
- Preserve the document structure and meaning
- Handle malformed HTML gracefully
- Return empty content if the page cannot be processed

### 3. chunk_text(content: str, chunk_size: int = 1000) -> List[Dict[str, str]]
**Purpose**: Split content into manageable chunks for embedding

**Parameters**:
- `content` (str): The content to chunk
- `chunk_size` (int): Maximum size of each chunk in characters (default: 1000)

**Returns**:
- `List[Dict[str, str]]`: List of chunks, each containing:
  - `text` (str): The chunk text
  - `start_pos` (int): Starting position in original content
  - `end_pos` (int): Ending position in original content

**Behavior**:
- Preserve semantic boundaries (don't split sentences)
- Ensure chunks don't exceed token limits for embedding services
- Maintain context between adjacent chunks if needed

### 4. embed(texts: List[str]) -> List[List[float]]
**Purpose**: Generate embeddings for a list of text chunks

**Parameters**:
- `texts` (List[str]): List of text chunks to embed

**Returns**:
- `List[List[float]]`: List of embedding vectors, each vector as a list of floats

**Behavior**:
- Use Cohere's embedding service to generate vectors
- Handle API rate limits with appropriate delays
- Return consistent vector dimensions for all embeddings
- Handle API errors gracefully with retries

### 5. create_collection(collection_name: str)
**Purpose**: Create a vector collection in Qdrant if it doesn't exist

**Parameters**:
- `collection_name` (str): Name of the collection to create (expected: "rag_embedding")

**Returns**:
- None

**Behavior**:
- Create collection with appropriate vector dimension for Cohere embeddings
- Handle case where collection already exists
- Configure collection for efficient similarity search

### 6. save_chunk_to_qdrant(chunk_data: Dict, embedding: List[float], collection_name: str)
**Purpose**: Save a chunk with its embedding to Qdrant

**Parameters**:
- `chunk_data` (Dict): Dictionary containing chunk information (text, url, title, etc.)
- `embedding` (List[float]): The embedding vector for this chunk
- `collection_name` (str): Name of the collection to save to

**Returns**:
- None

**Behavior**:
- Store the embedding with associated metadata (URL, title, original text)
- Use a unique ID for each stored vector
- Handle storage errors gracefully

### 7. main() -> None
**Purpose**: Main execution function that orchestrates the entire pipeline

**Parameters**:
- None

**Returns**:
- None

**Behavior**:
- Execute the complete pipeline: get URLs → extract text → chunk → embed → store
- Process all discovered URLs from the target site
- Provide progress feedback during execution
- Handle errors gracefully and continue processing where possible