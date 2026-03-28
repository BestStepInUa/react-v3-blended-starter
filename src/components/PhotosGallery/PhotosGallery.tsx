import type { Photo } from '../../types/photo'
import Grid from '../Grid/Grid'
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem'

interface PhotosGalleryProps {
	photos: Photo[]
	onSelect: (idx: number) => void
}

export default function PhotosGallery({ photos, onSelect }: PhotosGalleryProps) {
	return (
		<Grid>
			{photos.map((photo, idx) => (
				<PhotosGalleryItem key={photo.id} photo={photo} onSelect={() => onSelect(idx)} />
			))}
		</Grid>
	)
}
