import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Flickr() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const { flickr } = useSelector((store) => store.flickrReducer);
	const [Opt, setOpt] = useState({ type: 'interest' });

	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';
		if (!result) return alert('검색어를 입력하세요.');

		setOpt({
			type: 'search',
			tags: result,
		});
	};

	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	return (
		<Layout name={'Flickr'}>
			<div className='searchBox'>
				<input
					type='text'
					ref={input}
					placeholder='검색어를 입력하세요.'
					onKeyUp={(e) => {
						if (e.key === 'Enter') showSearch();
					}}
				/>
				<button onClick={showSearch}>SEARCH</button>
			</div>

			<div className='frame' ref={frame}>
				{flickr.map((pic, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
									/>
								</div>
								<h2>{pic.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Flickr;
