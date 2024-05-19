# Mathongo-Task

Mathongo Task is a comprehensive solution designed to streamline user management processes within applications. It offers a range of functionalities from viewing and adding users to bulk data import/export and maintaining user privacy through secure access controls.

## Installation

To set up Mathongo Task locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/shwetd19/Mathongo-Task.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Mathongo-Task
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

After setting up the project, you can start the development server with:
    ```bash
    npm run dev
    ```

## Features

### Add Users
- **Endpoint**: `POST /candidates/upload`
- **URL**: [http://localhost:3000/candidates/upload](http://localhost:3000/candidates/upload)
- **Input**:
  - `file`: An Excel file containing candidate information. The file must be multipart/form-data encoded.
- **Output**: Confirmation of user addition

### View Users
- **Endpoint**: `GET /candidates/return`
- **URL**: [http://localhost:3000/candidates/return](http://localhost:3000/candidates/return)
- **Input**: None required
- **Output**: List of all candidates

### Fetch Emails
- **Endpoint**: `GET /candidates/emails`
- **URL**: [http://localhost:3000/candidates/emails](http://localhost:3000/candidates/emails)
- **Input**: None required
- **Output**: Array of all unique email addresses of candidates

## API Documentation

For detailed information on the API endpoints, including request parameters and response formats, refer to the [API Documentation](https://documenter.getpostman.com/view/25227496/2sA3QmCuJq).
