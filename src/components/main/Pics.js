function Pics({ Scrolled, start }) {
	//position = 전체스크롤 거리값에서 해당 섹션요소의 세로 위치값을 뺀값
	//해당박스가 브라우저에 딱 걸리시점에 position값은 0
	// 변수 = 특정값 || 대체값 : 변수에 대입되는 특정값이 undefined, NaN같이 정상적이지 않은 값이 들어갈때 대신 대신 적용될 대체값 설정가능
	const position = Scrolled - start || 0;
	console.log(position);

	return (
		<section id='pics' className='myScroll'>
			<p
				style={{
					//기존의 left: 100에서 이동시키기 위해 position값에 초기값 100적용
					left: 100 + position,
				}}>
				FLICKR
			</p>
		</section>
	);
}

export default Pics;
