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

		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		const mapTypeControl = new kakao.maps.MapTypeControl();

		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map_result.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
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
