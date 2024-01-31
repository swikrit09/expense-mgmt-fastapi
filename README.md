# Expense Management System

This project is an Expense Management System built using FastAPI and MongoDB. It provides a backend service for tracking and managing personal or organizational expenses and incomes.

## Features

- User authentication with JWT tokens.
- Add, view, and manage income and expense transactions.
- Calculate the remaining balance based on income and expenses.
- User-specific transaction management.

## Technology Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs.
- **MongoDB**: A NoSQL database for storing user and transaction data.
- **PyJWT**: A Python library for working with JSON Web Tokens.
- **Uvicorn**: ASGI server for hosting the application.

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone [[URL to the repository]](https://github.com/swikrit09/expense-mgmt-fastapi.git)
   cd server
   ```

2. **Set Up a Virtual Environment** (Optional but recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate
   
   # On Windows use
   `cd venv\Scripts\activate`
   ```

3. **Install Required Packages**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Create a `.env` file in the project root with the following content:
   ```
   SECRET_KEY=your_secret_key
   MONGODB_URL=mongodb://localhost:27017/
   ```

5. **Running the Application**
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

- `/register` - User registration.
- `/login` - User login and token generation.
- `/trasaction` - Add transactions.
- `/income` - view income transactions.
- `/expense` - view expense transactions.
- `/incomelist` - view income list transactions.
- `/expenselist` - view expense list transactions.
- `/remaining` - Get remaining balance.



