# Data Model: Retrieval Pipeline Testing

## Entities

### Query Request
**Description**: Represents a query request for testing the retrieval pipeline

**Fields**:
- `query_text` (string): The original text query to be embedded and searched
- `top_k` (integer): Number of top results to retrieve (default: 5)
- `similarity_threshold` (float): Minimum similarity score threshold (0.0-1.0)
- `query_metadata` (dict): Additional metadata for the query (optional)

**Validation**:
- Query text must not be empty
- Top-k must be a positive integer
- Similarity threshold must be between 0.0 and 1.0

### Retrieved Result
**Description**: A single result returned from the Qdrant similarity search

**Fields**:
- `chunk_id` (string): The unique identifier of the retrieved chunk
- `content` (string): The text content of the retrieved chunk
- `similarity_score` (float): The similarity score between query and result (0.0-1.0)
- `metadata` (dict): Associated metadata including URL, title, and source information
- `position_in_results` (integer): Position in the top-k results (0-indexed)

**Validation**:
- Similarity score must be between 0.0 and 1.0
- Content must not be empty
- Chunk ID must be valid

### Validation Result
**Description**: Result of validation comparing retrieved content with original

**Fields**:
- `is_match` (boolean): Whether the retrieved content matches the original
- `similarity_ratio` (float): Text similarity ratio (0.0-1.0)
- `content_validation` (dict): Detailed content validation results
- `metadata_validation` (dict): Detailed metadata validation results
- `validation_notes` (string): Additional notes about the validation

**Validation**:
- Similarity ratio must be between 0.0 and 1.0
- Is_match should be consistent with similarity ratio and thresholds

### Test Response
**Description**: Complete response from the retrieval test including all validation

**Fields**:
- `query_request` (Query Request): The original query request
- `retrieved_results` (list[Retrieved Result]): List of retrieved results
- `validation_results` (list[Validation Result]): List of validation results
- `overall_accuracy` (float): Overall accuracy score for the test
- `test_timestamp` (datetime): When the test was executed
- `test_status` (string): Status of the test (success, partial, failure)
- `execution_time` (float): Time taken to execute the test in seconds

**Validation**:
- Retrieved results count should match top-k or available results
- Overall accuracy must be between 0.0 and 1.0

## Relationships

```
Query Request (1) → (Many) Retrieved Result (Many) → (1) Validation Result
```

A single query request produces multiple retrieved results, each of which has a corresponding validation result.

## State Transitions

### Test Response States
- `PENDING`: Test initialized but not yet executed
- `EXECUTING`: Query processing and retrieval in progress
- `VALIDATING`: Results being validated against original content
- `COMPLETED`: Test fully executed with all validations complete
- `FAILED`: Test failed due to errors (with error details)

### Processing Flow
```
PENDING → EXECUTING → VALIDATING → COMPLETED
    ↓              ↓              ↓
  FAILED ←———————————— ←———————————— (with error details)
```

## Constraints

1. **Similarity Threshold**: Retrieved results should only be considered valid if above the specified threshold
2. **Content Matching**: Text similarity must exceed 95% to be considered a valid match
3. **Metadata Integrity**: All expected metadata fields (URL, chunk_id) must be present and correct
4. **Performance**: Individual queries should complete within 2 seconds
5. **Ordering**: Results must be returned in descending order of similarity score