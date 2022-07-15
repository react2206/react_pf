// npm i react-masonry-component
import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const num = 500;
		let url = '';

		//opt객체로 넘어온 type에 따라서 axios에 전달할 url분기처리
		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
		}

		await axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');

			setTimeout(() => {
				setEnableClick(true);
			}, 500);
		}, 1000);
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
	}, []);

	return (
		<Layout name={'Gallery'}>
			{Loading && (
				<img
					className='loading'
					src={`${process.env.PUBLIC_URL}/img/loading.gif`}
				/>
			)}
			<button
				onClick={() => {
					if (!EnableClick) return;
					setEnableClick(false);
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'interest' });
				}}>
				Interest Gallery
			</button>

			<button
				onClick={() => {
					if (!EnableClick) return;
					setEnableClick(false);
					setLoading(true);
					frame.current.classList.remove('on');
					getFlickr({ type: 'search', tags: 'landscape' });
				}}>
				Search Gallery
			</button>

			<div className='searchBox'>
				<input type='text' ref={input} placeholder='검색어를 입력하세요.' />
				<button
					onClick={() => {
						const result = input.current.value;
						input.current.value = '';

						if (!EnableClick) return;
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({
							type: 'search',
							tags: result,
						});
					}}>
					SEARCH
				</button>
			</div>

			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
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
				</Masonry>
			</div>
		</Layout>
	);
}

export default Gallery;
