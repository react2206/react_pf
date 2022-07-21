import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Flickr() {
	const dispatch = useDispatch();
	const frame = useRef(null);
	//store에 있는 flickr데이터를 가져옴 (처음 사이클에서는 빈배열 가져옴)
	const { flickr } = useSelector((store) => store.flickrReducer);

	//컴포넌트 마운트시
	useEffect(() => {
		// FLICKR_START액션타입의 액션객체를 saga로 전달
		// saga.js에서는 해당 액션을 받아서 axios구문에 Opt옵션을 전달해서 반환된 결과물을 FLICKR_SUCCESS라는 액션타입에 payload에 값을 담은 새로운 액션 객체를 reducer에 전달하게 됨
		dispatch({
			type: 'FLICKR_START',
			Opt: {
				type: 'interest',
			},
		});
	}, []);

	return (
		<Layout name={'Flickr'}>
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
