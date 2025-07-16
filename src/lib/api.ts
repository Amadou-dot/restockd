import { Product } from '../../types/Product';

const API_BASE_URL = '/api';

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      response.statusText
    );
  }
  
  const result: ApiResponse<T> = await response.json();
  return result.data;
};

// Fetch products with pagination
export const fetchProducts = async (page: number = 1): Promise<ProductsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products?page=${page}`);
  return handleResponse<ProductsResponse>(response);
};

// Fetch single product by ID
export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return handleResponse<Product>(response);
};

// Query keys for React Query
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (page: number) => [...productKeys.lists(), page] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};
