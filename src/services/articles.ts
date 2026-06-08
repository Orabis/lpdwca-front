import axios, { type AxiosInstance } from 'axios'

type Articles = {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
};

type ApiResponse<data> = {
  data: data;
  meta?: unknown;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL_API,
  timeout: 5000,
  headers: { Authorization: `Bearer ${import.meta.env.TOKEN_API}` },
})

export async function getArticles(): Promise<Articles[] | null>{
  try {
    const response = await api.get<ApiResponse<Articles[]>>(`/articles`)
    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
    }
    else {
      console.error('Erreur inatendue:',error)
    }
    return null
  }
}

