---
id: 2
title: rag-agent-sdk-plan
stage: plan
date: 2025-12-14
surface: agent
model: Claude Sonnet 4.5
feature: rag-agent-sdk
branch: 004-rag-agent-sdk
user: user
command: /sp.plan
labels: [plan, rag, agent, openai, fastapi, architecture]
links:
  spec: specs/004-rag-agent-sdk/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/004-rag-agent-sdk/plan.md
 - specs/004-rag-agent-sdk/research.md
 - specs/004-rag-agent-sdk/data-model.md
 - specs/004-rag-agent-sdk/quickstart.md
 - specs/004-rag-agent-sdk/contracts/rag_agent_api_contract.md
 - CLAUDE.md
tests:
 -
---

## Prompt

Plan implementation for:
- FastAPI app structure and endpoint design
- OpenAI Agent initialization and configuration
- Retrieval tool wrapping Qdrant similarity search
- Context injection strategy for agent prompts
- JSON response schema (answer + sources)
- Error handling for no-hit or API failures

Exclude:
- Frontend integration
- UI state management
- Deployment or CI/CD

## Response snapshot

# Implementation Plan: RAG Agent Development with OpenAI Agents SDK and FastAPI

**Branch**: `004-rag-agent-sdk` | **Date**: 2025-12-14 | **Spec**: [specs/004-rag-agent-sdk/spec.md](../spec.md)
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a RAG agent using OpenAI Agents SDK and FastAPI that accepts user queries, retrieves relevant context from Qdrant, and generates grounded responses. The solution will include a FastAPI endpoint for accepting queries, an OpenAI Agent configured with retrieval tools, query embedding and Qdrant similarity search functionality, context injection into agent prompts, and clean JSON response formatting.

## Technical Context

**Language/Version**: Python 3.11
**Primary Dependencies**: fastapi, uvicorn, openai, cohere, qdrant-client, python-dotenv, pydantic
**Storage**: Qdrant vector database (external service) - for retrieval operations
**Testing**: pytest (for unit and integration tests)
**Target Platform**: Linux server environment (Ubuntu for ROS 2 compatibility as per constitution)
**Project Type**: backend/agent - backend service with AI agent integration
**Performance Goals**: Query processing under 5 seconds, 99% availability for API endpoint, 95% successful retrieval tool calls
**Constraints**: Must use same embedding model as ingestion pipeline for consistency, responses must be grounded only in retrieved content, exclude frontend integration and deployment concerns
**Scale/Scope**: Support for concurrent user queries, handle error cases gracefully including API unavailability and empty retrieval results

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the constitution:
- ✅ AI-Native Authoring: Using Claude Code for development
- ✅ Technical Accuracy: Using official OpenAI, FastAPI, and Qdrant APIs with proper documentation
- ✅ Academic Excellence: Clear function documentation and structured approach
- ✅ Practical Hands-On: Implementation will be testable and reproducible
- ✅ Modular Structure: Functions will be organized in a reusable manner
- ✅ Educational Technology: Backend service supporting educational content retrieval

## Project Structure

### Documentation (this feature)

```text
specs/004-rag-agent-sdk/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── rag_agent/
│   ├── __init__.py
│   ├── main.py          # FastAPI app with query endpoint
│   ├── agent.py         # OpenAI Agent configuration and tools
│   ├── retrieval_tool.py # Qdrant retrieval tool wrapper
│   ├── models.py        # Pydantic models for request/response schemas
│   └── config.py        # Configuration and settings
├── tests/
│   ├── test_api.py      # API endpoint tests
│   ├── test_agent.py    # Agent functionality tests
│   └── test_retrieval.py # Retrieval tool tests
└── requirements-agent.txt # Agent-specific dependencies
```

**Structure Decision**: Backend agent structure selected with dedicated modules for FastAPI app (main.py), OpenAI Agent (agent.py), retrieval tool (retrieval_tool.py), data models (models.py), and configuration (config.py). This separates concerns while maintaining clean organization for the RAG agent functionality as specified in the user requirements.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| External dependencies (OpenAI, Qdrant) | Required by feature specification | Feature cannot be implemented without these specific services |

## Outcome

- ✅ Impact: Created comprehensive implementation plan for RAG agent with OpenAI Agents SDK and FastAPI that addresses all user requirements
- 🧪 Tests: No automated tests created yet, but contracts defined for future testing
- 📁 Files: Created plan.md, research.md, data-model.md, quickstart.md, and contracts/rag_agent_api_contract.md
- 🔁 Next prompts: Ready for task generation with /sp.tasks
- 🧠 Reflection: Plan addresses all user requirements with appropriate technical choices and architecture decisions

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A