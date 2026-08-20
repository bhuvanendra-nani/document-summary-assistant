# Document Summary Assistant

An AI-powered document intelligence application that analyzes PDFs and images and generates concise summaries, key points, main ideas, and improvement suggestions.

Built as a technical assessment project for Unthinkable Solutions.

---

## Overview

Document Summary Assistant allows users to upload a PDF, PNG, JPG, or JPEG document and analyze its content using AI.

The application automatically handles different types of documents:

- Text-based PDFs → PDF text extraction
- Scanned PDFs → PDF rendering + OCR
- Images → Gemini Vision analysis

The extracted or visual content is then analyzed by Google Gemini to produce structured document intelligence.

---

## Features

### Document Upload

- Upload PDF, PNG, JPG, and JPEG files
- Maximum file size: 10 MB
- Client-side and server-side file validation
- In-memory file processing

### PDF Processing

The application automatically determines whether a PDF contains readable text.

#### Text-based PDF

```text
PDF
 ↓
pdf-parse
 ↓
Text extraction
 ↓
Text cleaning
 ↓
Gemini AI