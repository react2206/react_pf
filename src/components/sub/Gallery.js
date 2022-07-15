import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const [Items, setItems] = useState([]);

	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const num = 20;
	const interest_url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
	const search_url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${'ocean'}`;

	//url파라미터에 따라 결과값 달라지도록 수정
	const getFlickr = async (url) => {
		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
		frame.current.classList.add('on');
	};

	useEffect(() => {
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Gallery'}>
			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(interest_url);
				}}>
				Interest Gallery
			</button>

			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(search_url);
				}}>
				Search Gallery
			</button>

			<div className='frame' ref={frame}>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										alt={item.title}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
