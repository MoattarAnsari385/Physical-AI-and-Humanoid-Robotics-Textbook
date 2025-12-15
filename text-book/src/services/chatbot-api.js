import { BACKEND_URL } from '../config';

/**
 * Interface for query options
 * @typedef {Object} QueryOptions
 * @property {number} [top_k=5] - Number of top results to retrieve
 * @property {number} [temperature=0.7] - Temperature setting for response generation
 */

/**
 * Interface for backend response
 * @typedef {Object} BackendResponse
 * @property {boolean} success - Whether the request was successful
 * @property {Object|null} data - Response data if successful
 * @property {Object|null} error - Error data if failed
 * @property {string} request_id - Unique identifier for the request
 */

/**
 * Sends a query to the RAG backend
 * @param {string} query - The user's question
 * @param {QueryOptions} options - Additional options for the query
 * @returns {Promise<BackendResponse>} Promise resolving to backend response
 */
export const queryBackend = async (query, options = {}) => {
  const { top_k = 5, temperature = 0.7 } = options;

  try {
    const response = await fetch(`${BACKEND_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_k,
        temperature
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying backend:', error);
    return {
      success: false,
      data: null,
      error: {
        type: 'NETWORK_ERROR',
        message: error.message,
        details: error
      },
      request_id: null
    };
  }
};

/**
 * Default export for the API service
 */
export default {
  query: queryBackend
};