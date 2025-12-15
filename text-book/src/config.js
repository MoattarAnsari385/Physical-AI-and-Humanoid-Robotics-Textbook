// Configuration file for the chatbot application

// Backend API URL - defaults to localhost:8001 for development
// In Docusaurus, environment variables need to be accessed differently
export const BACKEND_URL = 'http://localhost:8002';

// Default timeout for API requests (in milliseconds)
export const API_TIMEOUT = 30000; // 30 seconds

// Default number of results to retrieve
export const DEFAULT_TOP_K = 5;

// Default temperature for response generation
export const DEFAULT_TEMPERATURE = 0.7;

// Animation duration constants (in milliseconds)
export const ANIMATION_DURATION = 300; // 300ms for open/close animations

// Message validation constants
export const MIN_MESSAGE_LENGTH = 1;
export const MAX_MESSAGE_LENGTH = 2000;

// Error message constants
export const NETWORK_ERROR_MESSAGE = 'Unable to connect to the AI service. Please check your connection and try again.';
export const TIMEOUT_ERROR_MESSAGE = 'The request timed out. Please try again.';
export const UNKNOWN_ERROR_MESSAGE = 'An unexpected error occurred. Please try again.';