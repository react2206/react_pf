import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window;
	const container = useRef(null);
	const [Location, setLocation] = useState(null);
	//Traffic 토글 기능 구현을 위한 state추가
	const [Traffic, setTraffic] = useState(false);

	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };

	const markerImage = new kakao.maps.MarkerImage(
		imageSrc,
		imageSize,
		imageOption
	);

	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});

	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
		setLocation(map_instance);
	}, []);

	//Traffic state값이 변경될때마다 실행될 구문
	useEffect(() => {
		//Location state값을 두번째 재호출 사이클부터 값이 담기므로 초기 오류방지를 위해 조건문 처리
		if (!Location) return;
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			{/* 버튼 클릭시 기존의 Traffic값을 반전처리 */}
			<button onClick={() => setTraffic(!Traffic)}>
				{/* Traffic값에 따라 버튼의 내용도 변경 */}
				{Traffic ? 'Traffic OFF' : 'Traffic ON'}
			</button>
		</Layout>
	);
}

export default Location;
