const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Request timeout configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  message: string;
  data: ContactData & { id: number };
}

/**
 * Input validation and sanitization utilities
 */
class InputValidator {
  /**
   * Sanitize string input to prevent XSS attacks
   */
  static sanitizeString(input: string): string {
    // Remove any HTML tags
    const withoutTags = input.replace(/<[^>]*>/g, '');

    // Escape special characters
    return withoutTags
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Validate name (letters, spaces, hyphens only)
   */
  static isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s-']+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
  }

  /**
   * Validate message content
   */
  static isValidMessage(message: string): boolean {
    return message.length >= 10 && message.length <= 5000;
  }

  /**
   * Validate contact form data
   */
  static validateContactData(data: ContactData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name || !this.isValidName(data.name)) {
      errors.push('Name must be 2-50 characters and contain only letters, spaces, and hyphens');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Please provide a valid email address');
    }

    if (!data.message || !this.isValidMessage(data.message)) {
      errors.push('Message must be between 10 and 5000 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize contact form data
   */
  static sanitizeContactData(data: ContactData): ContactData {
    return {
      name: this.sanitizeString(data.name.trim()),
      email: data.email.toLowerCase().trim(),
      message: this.sanitizeString(data.message.trim()),
    };
  }
}

/**
 * Enhanced API Client with security features
 * Note: CSRF tokens not required - this is a stateless REST API
 */
export class ApiClient {
  private baseUrl: string;
  private abortControllers: Map<string, AbortController> = new Map();

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Create AbortController for request timeout
   */
  private createTimeoutController(timeout: number): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }

  /**
   * Sleep for retry delay
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Make HTTP request with security enhancements
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Create abort controller for timeout
    const controller = this.createTimeoutController(REQUEST_TIMEOUT);
    this.abortControllers.set(endpoint, controller);

    // Build headers for REST API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    // Note: CSRF token not required for stateless REST API
    // credentials: 'omit' means we don't send cookies (no session auth)

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'omit', // REST API - no cookies/sessions
      signal: controller.signal,
      mode: 'cors',
    };

    try {
      const response = await fetch(url, config);

      // Clean up abort controller
      this.abortControllers.delete(endpoint);

      // Handle error responses
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));

        // Retry on 5xx errors (server errors)
        if (response.status >= 500 && retryCount < MAX_RETRIES) {
          await this.sleep(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
          return this.request<T>(endpoint, options, retryCount + 1);
        }

        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Clean up abort controller
      this.abortControllers.delete(endpoint);

      if (error instanceof Error) {
        // Handle timeout
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please try again.');
        }

        // Handle network errors with retry
        if (error.message.includes('fetch') && retryCount < MAX_RETRIES) {
          await this.sleep(RETRY_DELAY * Math.pow(2, retryCount));
          return this.request<T>(endpoint, options, retryCount + 1);
        }

        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  }

  /**
   * Submit contact form with validation and sanitization
   */
  async submitContact(data: ContactData): Promise<ContactResponse> {
    // Validate input
    const validation = InputValidator.validateContactData(data);
    if (!validation.valid) {
      throw new Error(validation.errors.join('. '));
    }

    // Sanitize input
    const sanitizedData = InputValidator.sanitizeContactData(data);

    return this.request<ContactResponse>('/contacts/', {
      method: 'POST',
      body: JSON.stringify(sanitizedData),
    });
  }

  /**
   * Get all contacts (requires authentication)
   */
  async getContacts(): Promise<ContactData[]> {
    return this.request<ContactData[]>('/contacts/');
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests(): void {
    for (const controller of this.abortControllers.values()) {
      controller.abort();
    }
    this.abortControllers.clear();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export validator for use in forms
export { InputValidator };
