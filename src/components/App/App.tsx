import Section from '../Section/Section'
import Container from '../Container/Container'
import { getPhotos } from '../../services/photos'
import toast, { Toaster } from 'react-hot-toast'
import Form from '../Form/Form'
import type { Photo } from '../../types/photo'
import { useState } from 'react'
import PhotosGallery from '../PhotosGallery/PhotosGallery'
import Loader from '../Loader/Loader'
import Text from '../Text/Text'
import Modal from '../Modal/Modal'

export default function App() {
	const [photos, setPhotos] = useState<Photo[]>([])
	const [photo, setPhoto] = useState<Photo | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleSubmit = async (query: string) => {
		try {
			setIsLoading(true)
			setIsError(false)

			const fetchPhotos = await getPhotos(query)

			if (fetchPhotos.length === 0)
				toast.error('No photos found for your request.', { id: 'unique-toast' })
			else toast.success('Successfully loaded photos.', { id: 'unique-toast' })

			setPhotos(fetchPhotos)
		} catch (error) {
			const isCanceled =
				error instanceof Error &&
				(error.name === 'CanceledError' || (error as { code?: string }).code === 'ERR_CANCELED')

			if (isCanceled) return

			setIsError(true)
			toast.error('Whoops, something went wrong! Please try again!', { id: 'unique-toast' })
		} finally {
			setIsLoading(false)
		}
	}
	console.log(photo)
	return (
		<>
			<Section>
				<Container>
					<Form onSubmit={handleSubmit} />
					{isLoading && <Loader />}
					{isError && <Text>Whoops, something went wrong! Please try again!</Text>}
					{photos.length > 0 && (
						<PhotosGallery photos={photos} onSelect={(photo) => setPhoto(photo)} />
					)}
				</Container>
			</Section>
			<div>
				<Toaster
					position='top-center'
					reverseOrder={false}
					toastOptions={{
						success: {
							style: {
								background: '#6bcb77',
								color: 'white',
							},
						},
						error: {
							style: {
								background: '#ff6b6b',
								color: 'white',
							},
						},
					}}
				/>
			</div>
			{photo && (
				<Modal onClose={() => setPhoto(null)}>
					<div
						style={{
							backgroundColor: photo.avg_color,
							borderColor: photo.avg_color,
						}}
					>
						<img src={photo.src.large} alt={photo.alt} />
					</div>
				</Modal>
			)}
		</>
	)
}
