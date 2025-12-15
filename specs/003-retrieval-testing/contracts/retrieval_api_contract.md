# API Contract: Retrieval Pipeline Testing Main Functions

## Overview
This document defines the expected interfaces for the main functions in the retrieval pipeline testing implementation.

## Function Definitions

### 1. generate_query_embedding(query_text: str) -> List[float]
**Purpose**: Generate embedding vector for a query text using the same model as ingestion

**Parameters**:
- `query_text` (str): The text query to convert to embedding

**Returns**:
- `List[float]`: The embedding vector as a list of floats

**Behavior**:
- Use the same Cohere model and parameters as used during ingestion
- Return consistent vector dimensions (same as stored embeddings)
- Handle API errors gracefully with appropriate error responses

### 2. search_qdrant(query_embedding: List[float], top_k: int = 5) -> List[Dict]
**Purpose**: Perform similarity search in Qdrant with configurable top-k results

**Parameters**:
- `query_embedding` (List[float]): The query embedding vector
- `top_k` (int): Number of top results to return (default: 5)

**Returns**:
- `List[Dict]`: List of retrieved results, each containing:
  - `chunk_id` (str): The unique identifier of the chunk
  - `content` (str): The text content of the retrieved chunk
  - `similarity_score` (float): Similarity score between 0.0 and 1.0
  - `metadata` (dict): Associated metadata including URL, title, etc.

**Behavior**:
- Use cosine similarity metric for search
- Return results ordered by descending similarity score
- Handle Qdrant connection errors gracefully

### 3. validate_content_match(retrieved_content: str, original_content: str) -> Dict
**Purpose**: Validate that retrieved content matches original source text

**Parameters**:
- `retrieved_content` (str): The content retrieved from Qdrant
- `original_content` (str): The original source content to compare against

**Returns**:
- `Dict`: Validation result containing:
  - `is_match` (bool): Whether content matches
  - `similarity_ratio` (float): Text similarity ratio (0.0-1.0)
  - `validation_details` (dict): Additional validation information

**Behavior**:
- Compare content using both exact match and similarity ratio
- Return true match if similarity exceeds 95%
- Handle edge cases like empty content gracefully

### 4. validate_metadata(retrieved_metadata: Dict, expected_metadata: Dict) -> Dict
**Purpose**: Verify that metadata fields (url, chunk_id) are correct

**Parameters**:
- `retrieved_metadata` (Dict): Metadata retrieved from Qdrant
- `expected_metadata` (Dict): Expected metadata to validate against

**Returns**:
- `Dict`: Metadata validation result containing:
  - `is_valid` (bool): Whether metadata is valid
  - `field_validations` (dict): Individual field validation results
  - `validation_errors` (list): List of validation errors

**Behavior**:
- Validate all required metadata fields (URL, chunk_id)
- Return detailed validation information for debugging
- Handle missing metadata fields appropriately

### 5. format_json_output(test_results: Dict) -> str
**Purpose**: Format test results into clean, structured JSON output

**Parameters**:
- `test_results` (Dict): Complete test results to format

**Returns**:
- `str`: JSON-formatted string with consistent schema

**Behavior**:
- Follow consistent JSON schema for all outputs
- Include query input, results, validation status, and metadata
- Ensure valid JSON format for downstream processing

### 6. run_retrieval_test(query_text: str, top_k: int = 5) -> Dict
**Purpose**: End-to-end test flow: input query → Qdrant search → structured JSON output

**Parameters**:
- `query_text` (str): The input query text
- `top_k` (int): Number of top results to retrieve (default: 5)

**Returns**:
- `Dict`: Complete test response containing:
  - `query_request`: Original query request
  - `retrieved_results`: List of retrieved results
  - `validation_results`: List of validation results
  - `overall_accuracy`: Overall accuracy score
  - `test_timestamp`: When test was executed
  - `test_status`: Status of the test
  - `execution_time`: Time taken to execute

**Behavior**:
- Execute complete flow: embed query → search Qdrant → validate results → format output
- Include comprehensive logging for retrieval correctness and errors
- Handle all edge cases and error conditions gracefully