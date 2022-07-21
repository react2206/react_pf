import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Flickr() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const { flickr } = useSelector((store) => store.flickrReducer);
	const [Opt, setOpt] = useState({ type: 'interest' });

	// 순서2 - showSearch함수 호출시 axios에 전달될 정보로 Opt state변경
	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';
		if (!result) return alert('검색어를 입력하세요.');

		setOpt({
			type: 'search',
			tags: result,
		});
	};

	//순서3 - Opt 스테이트값이 변경될떄마다 해당값을 FLICKR_START액션객체에 담아서 saga에 전달
	//순서4 - saga.js에서 해당 액션의 Opt값을 axios함수에 적용하여 데이터 호출뒤 반환값을 리듀서를 통해 store에 저장
	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	return (
		<Layout name={'Flickr'}>
			{/* 순서1 - 검색어 입력후 이벤트 발생시 showSearch함수 호출 */}
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
