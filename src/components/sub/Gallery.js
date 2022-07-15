import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function Gallery() {
	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const method_interest = 'flickr.interestingness.getList';
	const num = 20;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
	const [Items, setItems] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'></div>
		</Layout>
	);
}

export default Gallery;
