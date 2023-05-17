import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_APIK_KEY}`

const Gallery = () => {
	const { searchTerm } = useGlobalContext()

	const { isLoading, isError, data } = useQuery({
		queryKey: ['images', searchTerm],
		queryFn: async () => {
			const res = await axios.get(`${url}&query=${searchTerm}`)
			return res.data
		},
	})

	if (isLoading) {
		return (
			<section style={{ marginTop: '2rem' }}>
				<h5 style={{ textAlign: 'center' }}>Loading...</h5>
			</section>
		)
	}

	if (isError) {
		return (
			<section style={{ marginTop: '2rem' }}>
				<h5 style={{ textAlign: 'center' }}>There was an error.</h5>
			</section>
		)
	}

	const results = data.results
	if (results.length < 1) {
		return (
			<section style={{ marginTop: '2rem' }}>
				<h5 style={{ textAlign: 'center' }}>No results found.</h5>
			</section>
		)
	}

	return (
		<section className="image-container">
			{results.map((item) => {
				const url = item?.urls?.regular
				return <img src={url} key={item.id} alt={item.alt_description} className="img" />
			})}
		</section>
	)
}
export default Gallery
