import config from '../config';

export class ApiService {
  private static baseUrl = config.api.baseUrl;

  static async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  // Add more methods as needed
}

export default ApiService;
