import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Location2() {
	const { kakao } = window;
	//지도가 들어갈 프레임 참조
	const container = useRef(null);

	//맵옵션 (맵위치, 맵확대축소 레벨)
	const mapOption = {
		center: new kakao.maps.LatLng(37.56704043757791, 126.97862955893478),
		level: 3,
	};

	useEffect(() => {
		//컴포넌트 마운트시 지도 가상돔 요소에 출력 (인수로 지도가 들어갈 프레임, 지도옵션)
		const map_result = new kakao.maps.Map(container.current, mapOption);

		//마커 설정 및 추가
		const markerPosition = new kakao.maps.LatLng(
			37.56704043757791,
			126.97862955893478
		);
		const marker = new kakao.maps.Marker({
			position: markerPosition,
		});
		marker.setMap(map_result);

		//맵에 컨트롤 패널 추가
		const mapTypeControl = new kakao.maps.MapTypeControl();
		map_result.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
		const zoomControl = new kakao.maps.ZoomControl();
		map_result.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMLEFT);
	}, []);

	return (
		<Layout name={'Location2'}>
			<div id='map2' ref={container}></div>
		</Layout>
	);
}

export default Location2;
