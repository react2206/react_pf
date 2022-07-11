import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window;
	const container = useRef(null);
	//useEffect에서 만들어진 지도 인스턴스를  담을 state생성
	const [Location, setLocation] = useState(null);

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
		//맵인스턴스를 컴포넌트에서 자유롭게 쓰기 위해서 state에 저장
		setLocation(map_instance);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

			<button
				onClick={() => {
					Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffic ON
			</button>
			<button
				onClick={() => {
					Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				}}>
				Traffic OFF
			</button>
		</Layout>
	);
}

export default Location;
