import axios from 'axios'
import type { Photo } from '../types/photo'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL.replace(/\/$/, '')

const api = axios.create({
	baseURL: BASE_URL,
	params: {
		orientation: 'landscape',
	},
	headers: {
		Authorization: API_KEY,
	},
})

export const getPhotos = async (query: string): Promise<Photo[]> => {
	const { data } = await api.get(`search?query=${query}`)

	return data.photos
}
