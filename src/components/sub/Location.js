import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location() {
	const { kakao } = window;
	const container = useRef(null);
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	//마커 위치 인스턴스 생성
	const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

	//위치 인스턴스 값을 인수로 전달해서 다시 마커 인스턴스 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});

	useEffect(() => {
		//지도 인스턴스 최종 생성
		const map_instance = new kakao.maps.Map(container.current, option);
		//지도 인스턴스를 활용해 마커 생성
		marker.setMap(map_instance);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
