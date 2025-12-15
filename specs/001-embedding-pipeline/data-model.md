# Data Model: Embedding Pipeline

## Entities

### Document Chunk
**Description**: Represents a segment of extracted text from a Docusaurus page

**Fields**:
- `id` (string): Unique identifier for the chunk
- `content` (string): The actual text content of the chunk
- `url` (string): Original URL where the content was found
- `title` (string): Title of the page containing this chunk
- `section` (string): Section or heading under which this content appears
- `position` (integer): Position of this chunk within the document
- `metadata` (dict): Additional metadata including creation timestamp

**Validation**:
- Content must not exceed Cohere's token limit (typically < 4000 tokens)
- URL must be a valid URL format
- ID must be unique within the system

### Embedding Vector
**Description**: High-dimensional numerical representation of text content

**Fields**:
- `chunk_id` (string): Reference to the document chunk that generated this embedding
- `vector` (list[float]): The actual embedding vector (dimension depends on model)
- `metadata` (dict): Associated metadata including original URL, title, and section
- `created_at` (datetime): Timestamp when embedding was created

**Validation**:
- Vector must have consistent dimensions across all embeddings
- Chunk ID must reference an existing document chunk

### Document Metadata
**Description**: Information about the source document

**Fields**:
- `url` (string): Original URL of the document
- `title` (string): Title of the page
- `last_modified` (datetime): When the page was last updated
- `word_count` (integer): Number of words in the document
- `chunk_count` (integer): Number of chunks created from this document
- `crawl_timestamp` (datetime): When the document was crawled

**Validation**:
- URL must be valid
- Word count and chunk count must be non-negative

## Relationships

```
Document Metadata (1) → (Many) Document Chunk (1) → (1) Embedding Vector
```

A single document can be split into multiple chunks, each of which generates one embedding vector.

## State Transitions

### Document Chunk States
- `PENDING`: Chunk extracted but not yet embedded
- `EMBEDDED`: Embedding generated and ready for storage
- `STORED`: Embedding stored in Qdrant
- `FAILED`: Error occurred during processing

### Processing Flow
```
PENDING → EMBEDDED → STORED
    ↓
  FAILED (with error details)
```

## Constraints

1. **Size Limit**: Individual chunks should not exceed 1000 tokens to ensure quality embeddings
2. **Uniqueness**: Each chunk should be unique to avoid duplicate embeddings
3. **Metadata Preservation**: Original URL and context must be preserved with each embedding
4. **Integrity**: Embedding vectors must maintain referential integrity with source chunks