import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const pop = useRef(null);
	const input = useRef(null);
	const { flickr } = useSelector((store) => store.flickrReducer);
	const [Opt, setOpt] = useState({ type: 'user', user: '164021883@N04' });
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	const startLoading = () => {
		setLoading(true);
		frame.current.classList.remove('on');
	};

	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	};

	const showInterest = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		startLoading();
		setOpt({ type: 'interest' });
	};

	const showSearch = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		const result = input.current.value.trim();
		input.current.value = '';
		if (!result) return alert('검색어를 입력하세요.');
		startLoading();

		setOpt({
			type: 'search',
			tags: result,
		});
	};

	const showUser = (e) => {
		if (!EnableClick) return;
		setEnableClick(false);

		let userID = '164021883@N04';
		e.target.innerText !== 'My Gallery' && (userID = e.target.innerText);
		startLoading();
		setOpt({ type: 'user', user: userID });
	};

	const openPop = (index) => {
		pop.current.open();
		setIndex(index);
	};

	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	useEffect(endLoading, [flickr]);

	return (
		<>
			<Layout name={'Flickr'}>
				{Loading && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
					/>
				)}

				<button onClick={showInterest}>Interest Gallery</button>
				<button onClick={showUser}>My Gallery</button>

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
					<Masonry elementType={'div'} options={masonryOptions}>
						{flickr.map((pic, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div className='pic' onClick={() => openPop(idx)}>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
												alt={pic.title}
											/>
										</div>
										<h2>{pic.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={showUser}>{pic.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${flickr[Index].server}/${flickr[Index].id}_${flickr[Index].secret}_b.jpg`}
						alt={flickr[Index].title}
					/>
				)}
			</Popup>
		</>
	);
}

export default Flickr;
