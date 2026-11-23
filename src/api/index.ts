import { Api, HttpClient } from './Api';

const httpClient = new HttpClient({
  baseURL: '',
  withCredentials: true,
});

export const api = new Api(httpClient);

export * from './Api';
