# Document Summary Assistant - Architecture

## Overview

The application converts PDF and image documents into structured AI-generated summaries.

## Architecture

```text
User
 │
 ▼
React Frontend
 │
 │ PDF / Image + Summary Length
 ▼
Express Backend
 │
 ▼
File Validation
 │
 ├── PDF ──────────────► PDF Text Extraction
 │
 └── Image ────────────► Tesseract OCR
 │
 ▼
Text Processing
 │
 ├── Clean Text
 │
 └── Split Large Documents
 │
 ▼
Gemini AI
 │
 ▼
Structured JSON
 │
 ├── Summary
 ├── Key Points
 ├── Main Ideas
 └── Improvement Suggestions
 │
 ▼
React Frontend