# Gemini AI Integration Setup

## Overview
The PDF transaction analysis now uses Google's Gemini AI for intelligent extraction and categorization of financial transactions from bank statements.

## Setup Instructions

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment
Add your Gemini API key to the backend `.env` file:
```
GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### 3. Test Connection
Run the test utility to verify your API key works:
```bash
cd backend
node utils/geminiTest.js
```

## Features

### AI-Powered Analysis
- **Intelligent Categorization**: Automatically categorizes transactions (Food, Transportation, Bills, etc.)
- **Smart Description Cleaning**: Extracts meaningful descriptions from bank statement text
- **Accurate Amount Detection**: Handles various currency formats and decimal places
- **Date Parsing**: Recognizes multiple date formats
- **Transaction Type Detection**: Distinguishes between income and expenses

### Supported Categories
- Food & Dining
- Transportation
- Shopping
- Bills & Utilities
- Entertainment
- Healthcare
- Education
- Investment
- Salary
- Business
- Other

### Processing Limits
- PDF file size: 5MB maximum
- Text analysis: First 4000 characters
- Transaction limit: 25 most significant transactions per upload
- Minimum amount: Filters out transactions under $5

## Usage

1. Upload a PDF bank statement
2. AI analyzes the text content
3. Extracts and categorizes transactions
4. Saves to your transaction history
5. View results in the dashboard

## Error Handling
- Invalid PDF format detection
- API key validation
- Network error recovery
- Malformed response handling
- Database save error management