import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location2() {
	const { kakao } = window;
	const container = useRef(null);
	const mapOption = {
		center: new kakao.maps.LatLng(37.56704043757791, 126.97862955893478), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	useEffect(() => {
		const map_result = new kakao.maps.Map(container.current, mapOption);

		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		const markerPosition = new kakao.maps.LatLng(
			37.56704043757791,
			126.97862955893478
		);

		// 마커를 생성합니다
		const marker = new kakao.maps.Marker({
			position: markerPosition,
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map_result);
	}, []);

	return (
		<Layout name={'Location2'}>
			<div id='map2' ref={container}></div>
		</Layout>
	);
}

export default Location2;
