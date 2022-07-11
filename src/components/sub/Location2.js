import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location2() {
	const { kakao } = window;
	const container = useRef(null);
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	useEffect(() => {
		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		const map_result = new kakao.maps.Map(container.current, mapOption);
	}, []);

	return (
		<Layout name={'Location2'}>
			<div id='map2' ref={container}></div>
		</Layout>
	);
}

export default Location2;
