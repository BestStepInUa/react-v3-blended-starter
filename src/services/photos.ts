import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL.replace(/\/$/, '')

const api = axios.create({
	baseURL: VITE_BASE_URL,
	params: {
		orientation: 'landscape',
	},
	headers: {
		Authorization: API_KEY,
	},
})

export const getPhotos = async (query) => {
	const response = await api.get(`search?query=${query}`)

	return response.data.photos
}
