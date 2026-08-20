# Document Summary Assistant - Architecture

## Overview

The application converts PDF and image documents into structured AI-generated summaries using PDF text extraction, OCR, and Gemini Vision.

## Architecture

```text
                         User
                           │
                           ▼
                   React Frontend
                           │
                           │
                 PDF / Image + Length
                           │
                           ▼
                   Express Backend
                           │
                           ▼
                   File Validation
                           │
              ┌────────────┴────────────┐
              │                         │
             PDF                      Image
              │                         │
              ▼                         ▼
       PDF Text Extraction        Gemini Vision
              │                         │
        ┌─────┴─────┐                   │
        │           │                   │
   Readable Text   Scanned PDF          │
        │           │                   │
        │           ▼                   │
        │      PDF → Image              │
        │           │                   │
        │           ▼                   │
        │      Tesseract OCR            │
        │           │                   │
        └─────┬─────┘                   │
              │                         │
              ▼                         │
       Text Processing                  |
              │                         |
          ┌───┴───┐                     |
          │       │                     |
        Clean   Split                   |
        Text    Chunks                  |
          │       │                     |
          └───┬───┘                     |
              │                         |
              ▼                         |
          Gemini AI                     │
              │                         │
              └──────────┬──────────────┘
                         │
                         ▼
                     Gemini AI
                         │
                         ▼
                  Structured JSON
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
       Summary      Key Points      Main Ideas
                         │
                         ▼
              Improvement Suggestions
                         │
                         ▼
                  React Frontend
                         │
                         ▼
                  Display Results

Processing Paths

Text-based PDF

PDF
 ↓
pdf-parse
 ↓
Extracted Text
 ↓
Text Processing
 ↓
Gemini AI
 ↓
Structured Analysis

Scanned PDF

Scanned PDF
 ↓
pdf-parse
 ↓
Insufficient Text Detected
 ↓
PDF → PNG
 ↓
Tesseract OCR
 ↓
Extracted Text
 ↓
Text Processing
 ↓
Gemini AI
 ↓
Structured Analysis

Image

PNG / JPG / JPEG
 ↓
Gemini Vision
 ↓
Visual + Text Analysis
 ↓
Structured Analysis

AI Output

Gemini generates:

Document Type
Summary
Key Points
Main Ideas
Improvement Suggestions