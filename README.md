# QR Scanner API

## Overview
- A backend API for managing QR code scanning sessions with tracking and analytics capabilities. Built with Node.js, Express, and MongoDB.

## Features
- Session Management: Create and track scanning sessions
- Code Validation: Verify QR codes against allowed list
- Scan Analytics: Track successful/failed scans
- CSV Import: Bulk upload allowed codes
- Data Export: Download scan history as CSV

## API Endpoints
### Sessions
- POST /api/session - Create new session (with CSV upload)
- GET /api/session - Get active session
- GET /api/session/:sessionId/data - Get session statistics

### Scans
- POST /api/scan/:sessionId - Record a scan
- GET /api/scan/:sessionId - Get scan history
- GET /api/scan/:sessionId/export - Export scans as CSV

## Data Models
- Session: Tracks scanning sessions with location and creator info
- Code: Stores valid QR codes with scan limits
- Scan: Records each scan attempt with status

## Setup
- Install dependencies: npm install
- Configure MongoDB connection in config/db.js
- Set environment variables (JWT secret, etc.)
- Start server: npm start

## Requirements
- Node.js
- MongoDB
- Express

## Security
- JWT authentication
- Hashed sensitive data
- Input validation
- CORS restrictions

## Usage
- Create session with CSV of allowed codes
- Scan QR codes via API endpoint
- Monitor scans through analytics endpoints
- Export data when needed