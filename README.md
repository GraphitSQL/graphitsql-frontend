# GraphitSQL Frontend

Welcome to the **GraphitSQL Frontend** project! This README will guide you through setting up and running the application. Please follow the instructions below.

## Prerequisites

Ensure that you have the following software installed on your machine:

- **Node.js** (v20.0.0 or later)
- **npm** (Node.js package manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/graphitsql-frontend.git
   cd graphitsql-frontend
   ```

2. **Install dependencies:**

   Run the following command to install the necessary packages:

   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To start the application in development mode with hot-reloading, use the following command:

```bash
npm run dev
```

This will start a local development server. You can view the application by navigating to `http://localhost:5173` in your web browser.

### Production Build

To create a production-ready build of the application, use the following command:

```bash
npm run build
```

The compiled files will be located in the `dist` directory.

### Preview Production Build

After building the application, you can preview it with:

```bash
npm run preview
```

This command serves the content from the `dist` folder on a local server.

## Linting

To maintain code quality, you can lint your codebase using ESLint:

```bash
npm run lint
```

Make sure to fix any issues highlighted by the linter to ensure consistency across the codebase.

## Support

If you encounter any issues or have questions about this project, please open an issue in the [GitHub repository](https://github.com/your-username/graphitsql-frontend/issues).

