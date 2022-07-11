import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	const { kakao } = window;
	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.5127099887378, 127.06069983235905),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(37.51881764760613, 127.11633054508519),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.566918804166775, 126.97863525321908),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 90) },
		},
	];
	const container = useRef(null);
	const btns = useRef(null);
	const [Location, setLocation] = useState(null);
	const [Traffic, setTraffic] = useState(false);
	const [Info] = useState(info);
	const [Index, setIndex] = useState(0);

	const option = {
		center: Info[Index].latlng,
		level: 3,
	};

	//기존 지도위치값, 마커 정보값을 Index 순서값과 연동
	const markerPosition = Info[Index].latlng;
	const imageSrc = Info[Index].imgUrl;
	const imageSize = Info[Index].imgSize;
	const imageOption = Info[Index].imgPos;

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
		container.current.innerHTML = '';

		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
		setLocation(map_instance);

		window.addEventListener('resize', () => {
			map_instance.setCenter(Info[Index].latlng);
		});
	}, [Index]);

	useEffect(() => {
		if (!Location) return;
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<div className='btnSet'>
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? 'Traffic OFF' : 'Traffic ON'}
				</button>

				<ul className='branch' ref={btns}>
					{Info.map((info, idx) => {
						let on = '';
						Index === idx ? (on = 'on') : (on = '');
						return (
							<li key={idx} onClick={() => setIndex(idx)} className={on}>
								{info.title}
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
}

export default Location;
