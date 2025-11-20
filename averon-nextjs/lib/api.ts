const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  message: string;
  data: ContactData & { id: number };
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  }

  async submitContact(data: ContactData): Promise<ContactResponse> {
    return this.request<ContactResponse>('/contacts/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(): Promise<ContactData[]> {
    return this.request<ContactData[]>('/contacts/');
  }
}

export const apiClient = new ApiClient();
