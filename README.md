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
├── .env.example              # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
├── README.md                  # This file
└── REACT_QUERY_SETUP.md       # React Query documentation
```

## Features

- **Next.js 15 App Router** - Modern routing with server components
- **React Query/TanStack Query** - Data fetching and caching
- **TypeScript** - Type-safe development
- **NextAuth.js** - Authentication with multiple providers
- **AWS S3 Integration** - File and image storage
- **Stripe Integration** - Payment processing
- **Email Services** - Password reset and welcome emails
- **PDF Generation** - Invoice generation with AWS S3 storage
- **Responsive Design** - Mobile-first approach
- **Product Management** - CRUD operations for products

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **State Management**: React Query/TanStack Query
- **Styling**: CSS with responsive design
- **Database**: MongoDB
- **Cloud Storage**: AWS S3
- **Payment Processing**: Stripe
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

3. **Configure environment variables** (see Environment Variables section below)

4. **Run development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Architecture

The application follows a modern Next.js 15 architecture with:

- **App Router**: File-based routing with server components
- **TypeScript**: Full type safety throughout the application
- **Centralized Configuration**: All constants in `src/config/app.ts`
- **Error Handling**: Consistent error types and handling patterns
- **State Management**: React Query for server state, React Context for client state
- **Code Quality**: ESLint + Prettier with custom rules for consistency

For detailed coding standards, see [STYLE_GUIDE.md](./STYLE_GUIDE.md)

## Code Quality & Linting

This project uses a comprehensive linting setup to ensure code consistency:

### Available Commands

```bash
# Linting
pnpm lint          # Check for linting errors
pnpm lint:fix      # Auto-fix linting errors
pnpm lint:strict   # Lint with zero warnings allowed

# Formatting
pnpm format        # Format all files with Prettier
pnpm format:check  # Check formatting without changes

# Type checking
pnpm type-check    # Run TypeScript compiler checks
```

### Pre-commit Hooks

Automatic code quality checks run before each commit:

- ESLint auto-fix
- Prettier formatting
- TypeScript type checking

### Key Rules Enforced

- **Type-only imports**: `import type` for better performance
- **No magic numbers**: Use constants from config files
- **Consistent naming**: PascalCase for interfaces, camelCase for variables
- **No console.log**: Only `console.warn` and `console.error` allowed
- **Proper React patterns**: Function declarations for components

See [LINTING_GUIDE.md](./LINTING_GUIDE.md) for complete documentation.

## Environment Variables

Create a `.env` file based on `.env.example` with the following variables:

### Required Variables

```env
# Database Configuration (REQUIRED)
MONGODB_URI=mongodb://localhost:27017/restockd

# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Stripe Configuration (REQUIRED for checkout)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
CLIENT_URL=http://localhost:3000

# AWS S3 Configuration (REQUIRED for PDF invoices)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name
```

### Optional Variables

```env
# OAuth Providers (Optional)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Email Configuration (Optional)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
APP_NAME=Restock-D
```

## Development

- **React Query DevTools** - Available in development mode
- **Hot Module Replacement** - Instant updates during development
- **TypeScript** - Full type checking and IntelliSense
- **Error Boundaries** - Graceful error handling
- **NextAuth.js** - Built-in authentication system

## Authentication

The platform supports multiple authentication providers:

- **Credentials** - Email/password authentication
- **GitHub OAuth** - Sign in with GitHub (optional)
- **Google OAuth** - Sign in with Google (optional)

## Payment Processing

Stripe integration provides:

- Secure payment processing
- Subscription management
- Invoice generation
- Payment history

## File Storage

AWS S3 integration handles:

- Product image uploads
- PDF invoice storage
- File management utilities

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Configure production URLs for NextAuth and Stripe
4. Deploy automatically on push to main branch

### Production Environment Variables

For production deployment, update these variables:

- `NEXTAUTH_URL` - Your production domain
- `CLIENT_URL` - Your production domain
- `STRIPE_SECRET_KEY` - Use live Stripe keys
- `MONGODB_URI` - Production MongoDB connection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
