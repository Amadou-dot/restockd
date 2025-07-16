
# Restock'd - Modern E-commerce Platform

A comprehensive e-commerce platform built with Next.js 15, featuring product management, user authentication, and modern UI components.

## Project Structure

```
restock-d/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Loading UI
│   │   ├── products/          # Products pages
│   │   │   └── page.tsx       # Products listing
│   │   ├── api/               # API routes
│   │   │   └── products/      # Product API endpoints
│   │   ├── favicon.ico        # App favicon
│   │   └── icon.png           # App icon
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts             # API client
│   │   └── queryHelpers.ts    # React Query utilities
│   └── utils/                 # Utility functions
│       ├── AWSBucket.ts       # AWS S3 file operations
│       ├── sendPasswordResetEmail.ts  # Email utilities
│       └── sendWelcomeEmail.ts        # Welcome email service
├── .next/                     # Next.js build output
├── node_modules/              # Dependencies
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
├── README.md                  # This file
└── REACT_QUERY_SETUP.md       # React Query documentation
```

## Features

- **Next.js 15 App Router** - Modern routing with server components
- **React Query/TanStack Query** - Data fetching and caching
- **TypeScript** - Type-safe development
- **AWS S3 Integration** - File and image storage
- **Email Services** - Password reset and welcome emails
- **Responsive Design** - Mobile-first approach
- **Authentication** - User management system
- **Product Management** - CRUD operations for products

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **State Management**: React Query/TanStack Query
- **Styling**: CSS with responsive design
- **Database**: (Database configuration not shown in current structure)
- **Cloud Storage**: AWS S3
- **Email Service**: Resend
- **Development Tools**: ESLint, Prettier

## Getting Started

1. **Install dependencies**
    ```bash
    pnpm install
    ```

2. **Set up environment variables**
    ```bash
    cp .env.example .env
    ```

3. **Run development server**
    ```bash
    pnpm dev
    ```

4. **Open your browser**
    Navigate to `http://localhost:3000`

## Environment Variables

Create a `.env` file with the following variables:

```env
# App Configuration
APP_NAME=Restock'd
CLIENT_URL=http://localhost:3000

# AWS S3
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Email Service
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourapp.com

# Database
DATABASE_URL=your-database-url
```

## Development

- **React Query DevTools** - Available in development mode
- **Hot Module Replacement** - Instant updates during development
- **TypeScript** - Full type checking and IntelliSense
- **Error Boundaries** - Graceful error handling

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
