# Research: Embedding Pipeline Implementation

## Decision: Python package management with UV
**Rationale**: UV is a fast Python package manager written in Rust that provides faster dependency resolution and installation compared to pip. It's ideal for this project as it will help manage dependencies efficiently for the backend service.

**Alternatives considered**:
- pip: Standard but slower
- Poetry: Feature-rich but potentially overkill for this simple project
- Conda: More appropriate for data science environments

## Decision: Text extraction from Docusaurus URLs
**Rationale**: Docusaurus sites are static sites with predictable HTML structure. Using requests + BeautifulSoup4 is the most reliable approach for extracting clean text content while excluding navigation elements.

**Alternatives considered**:
- Selenium: More complex, needed only for JavaScript-heavy sites
- Playwright: Similar to Selenium, overkill for static content
- Direct API calls: Not available for static Docusaurus sites

## Decision: Text chunking strategy
**Rationale**: For semantic search, text should be chunked into meaningful segments (paragraphs/sentences) rather than fixed-length windows. This preserves context while keeping chunks within embedding service limits.

**Alternatives considered**:
- Fixed-length token chunks: May break semantic context
- Recursive splitting: More complex but maintains some context
- Sentence-based chunks: Preserves meaning but may vary greatly in size

## Decision: Cohere embedding model
**Rationale**: Cohere's embed-multilingual-v3.0 model supports multiple languages and provides high-quality embeddings suitable for technical documentation. It handles the 4096 token limit efficiently.

**Alternatives considered**:
- OpenAI embeddings: Different pricing model and API
- Sentence Transformers: Self-hosted option but requires more infrastructure
- Other embedding providers: Different quality and pricing characteristics

## Decision: Qdrant vector database setup
**Rationale**: Qdrant provides efficient similarity search with good Python client support. Using the "rag_embedding" collection name as specified in requirements.

**Alternatives considered**:
- Pinecone: Cloud-native but different API
- Weaviate: Alternative vector database with different features
- FAISS: Facebook's library but requires more manual management

## Decision: Error handling and retry mechanisms
**Rationale**: API calls to Cohere and Qdrant may fail due to rate limits or temporary outages. Implementing exponential backoff with retries ensures robustness.

**Alternatives considered**:
- Simple retry loops: Less sophisticated
- No retries: Not resilient
- Circuit breaker pattern: More complex but more robust for production

## Decision: URL discovery for Docusaurus site
**Rationale**: For the specific site https://physical-ai-and-humanoid-robotics-t-seven.vercel.app/, we can either crawl the site dynamically or use sitemap.xml if available. Sitemap is more reliable for Docusaurus sites.

**Alternatives considered**:
- Manual URL list: Not scalable
- Dynamic crawling: More complex but more comprehensive
- Sitemap parsing: Reliable for Docusaurus sites