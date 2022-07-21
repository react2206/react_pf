import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const { flickr } = useSelector((store) => store.flickrReducer);
	const [Opt, setOpt] = useState({ type: 'user', user: '164021883@N04' });
	const [Loading, setLoading] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	//로딩바 출력하면서 기존 프레임 숨기는 함수
	const startLoading = () => {
		setLoading(true);
		frame.current.classList.remove('on');
	};

	//로딩바 제거하고 다시 프레임 보이는 함수
	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 1000);
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';
		if (!result) return alert('검색어를 입력하세요.');
		//showSearch함수가 호출될떄 setOpt데이터 요청하기전
		//startLoaing함수로 로딩화면 처리
		startLoading();

		setOpt({
			type: 'search',
			tags: result,
		});
	};

	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	//flickr state가 변경될때마다 endLoading함수 호출해서 로딩바 숨기고 화면출력
	//flickr값이 변경된다는 의미는 store로 부터 변경요청한 비동기데이터가 로딩완료됐다는 의미
	useEffect(endLoading, [flickr]);

	return (
		<Layout name={'Flickr'}>
			{Loading && (
				<img
					className='loading'
					src={`${process.env.PUBLIC_URL}/img/loading.gif`}
				/>
			)}

			<button
				onClick={() => {
					//interest갤러리 버튼 클릭시 로딩바 보이기
					startLoading();
					setOpt({ type: 'interest' });
				}}>
				Interest Gallery
			</button>

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
									<div className='pic'>
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
										<span
											onClick={(e) => {
												//사용자 아이디 클릭시 로딩바 보이기
												startLoading();
												setOpt({ type: 'user', user: e.target.innerText });
											}}>
											{pic.owner}
										</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}

export default Flickr;
