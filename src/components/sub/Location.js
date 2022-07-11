import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Location() {
	//윈도우 객체로부터 kakao란 변수로 비구조화할당으로 값 가져옴
	const { kakao } = window;

	//지도에 출력할 정보값을 지열별로 객체로 묶어서 배열로 관리
	const info = [
		{
			title: '삼성동 코엑스', //버튼에 출력될 문자
			latlng: new kakao.maps.LatLng(37.5127099887378, 127.06069983235905), //마커와 지도가 출력될 위치정보값
			imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`, //마커의 이미지소스
			imgSize: new kakao.maps.Size(232, 99), //마커의 이미지 사이즈
			imgPos: { offset: new kakao.maps.Point(116, 90) }, //마커의 위치값
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

	//지도를 출력할 가상돔 요소를 참조객체로 담아둠
	const container = useRef(null);

	//지도의 정보값이 담길 state추가
	const [Location, setLocation] = useState(null);

	//교통정보값의 출력 유무를 관장하는 boolean값이 담길 state추가
	const [Traffic, setTraffic] = useState(false);

	//위에 배열로 만들어 놓은 정보값이 담길 state 추가
	const [Info] = useState(info);

	//버튼 클릭할때마다 순서값이 담길 state추가
	const [Index, setIndex] = useState(0);

	//지도를 화면에 출력할때 필요한 필수옵션값 객체로 준비
	const option = {
		center: Info[Index].latlng, //위치값
		level: 3, //확대 정도
	};

	//마커에 필요한 정보값 변수에 할당
	const markerPosition = Info[Index].latlng; //마커 위치
	const imageSrc = Info[Index].imgUrl; //마커의 이미지소스
	const imageSize = Info[Index].imgSize; //마커의 사이즈
	const imageOption = Info[Index].imgPos; //마커의 보정위치정보

	//위의 정보값을 토대로 마커의 정보값  반환받음
	const markerImage = new kakao.maps.MarkerImage(
		imageSrc,
		imageSize,
		imageOption
	);

	//반환받은 마커의 정보값으로 실제 화면에 마커 출력
	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});

	//버튼 클릭해서 Index값이 변경될때마다 실행될 구문
	useEffect(() => {
		//지도 프레임 안쪽의 내용을 비워서  지도 초기화
		container.current.innerHTML = '';

		//위에서 변수에 할당한 모 든 정보값을  활용해서 프레임에 지도 출력
		const map_instance = new kakao.maps.Map(container.current, option);
		//마커를 화면 중앙에 위치
		marker.setMap(map_instance);
		//마커의 정보 반환값을 Location state에 옮겨담음
		setLocation(map_instance);

		//브라우저가 리사이즈될때마다 실행할 함수
		const handleResize = () => {
			console.log('location컴포넌트에 리사이즈 이벤트 발생!!');
			//브라우저 리사이즈시 화면 가운데 마커 유지
			map_instance.setCenter(Info[Index].latlng);
		};

		//브라우저 리사이즈시 마커가운데 유지함수 호출
		window.addEventListener('resize', handleResize);

		//해당 컴포넌트가 사라질때 resize이벤트에 연결되 handleResize함수 제거
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [Index]);

	//Traffic값이 변경될때마다 실행될 구문
	useEffect(() => {
		//Location값이 없으면 해당 함수 종료
		if (!Location) return;

		//traffic이 true일때 교통량 표시
		//traffic이 false일때 교통량 숨김
		Traffic
			? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<div className='btnSet'>
				{/* 버튼 클릭시 Traffic값 계속 반전 (토글) */}
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? 'Traffic OFF' : 'Traffic ON'}
				</button>

				<ul className='branch'>
					{/* INfo의 갯수만큼 반복을 돌며 버튼 반복 출력 */}
					{Info.map((info, idx) => {
						let on = '';
						//현재 활성화 순번 Index와 지금 반복돌고 있는 idx값의 순서가 동일하면 해당 버튼 활성화
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
