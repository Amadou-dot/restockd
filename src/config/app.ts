// Application Configuration
export const APP_CONFIG = {
  // Application metadata
  name: "Restock'd",
  description: 'A modern e-commerce platform for all your restocking needs',
  version: '1.0.0',

  // URLs
  baseUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',

  // Pagination
  productsPerPage: 4,

  // Business rules
  tax: {
    rate: 0.08,
    displayRate: '8%',
  },

  shipping: {
    cost: 0, // Free shipping
    displayText: 'Free shipping on all orders',
  },

  // Company information
  company: {
    name: "Restock'd",
    address: '123 Commerce St, Business City, BC 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@restockd.com',
  },

  // Limits and validation
  product: {
    nameMaxLength: 200,
    descriptionMaxLength: 2000,
    priceMax: 999999.99,
    priceMin: 0.01,
  },

  user: {
    nameMinLength: 2,
    nameMaxLength: 50,
    passwordMinLength: 8,
  },

  cart: {
    maxQuantityPerItem: 99,
  },

  // File handling
  images: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },

  // Query configuration
  queryDefaults: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 3,
    retryBaseDelay: 1000, // 1 second
    retryMaxDelay: 30000, // 30 seconds
  },

  // HTTP status codes
  httpStatus: {
    badRequest: 400,
    serverError: 500,
    success: 200,
  },

  // Error handling
  errorThresholds: {
    clientErrorMin: 400,
    clientErrorMax: 499,
    serverErrorMin: 500,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;

// Individual exports for backward compatibility
export const PRODUCTS_PER_PAGE = APP_CONFIG.productsPerPage;
export const TAX_RATE = APP_CONFIG.tax.rate;
export const SHIPPING_COST = APP_CONFIG.shipping.cost;
export const TAX_DISPLAY_RATE = APP_CONFIG.tax.displayRate;
export const COMPANY_INFO = APP_CONFIG.company;

// HTTP status code exports
export const HTTP_STATUS = APP_CONFIG.httpStatus;
export const ERROR_THRESHOLDS = APP_CONFIG.errorThresholds;
