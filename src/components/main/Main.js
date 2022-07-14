import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import Anime from '../../asset/anim';
import { useRef, useEffect, useState } from 'react';

function Main() {
	const main = useRef(null);
	const pos = useRef([]);
	const [Index, setIndex] = useState(0);

	//섹션의 세로 위치값을 구하는 함수
	const getPos = () => {
		pos.current = [];
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	//스크롤 위치에 따라서 버튼 활성화 함수
	const activation = () => {
		const scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.scroll_navi li');

		//pos.current배열에 등록된 각 섹션의 세로 위치값을 반복을 돌면서
		pos.current.map((pos, idx) => {
			//현재 스크롤된 거리값의 각 섹션의 위치값보다 같거나 크면
			if (scroll >= pos) {
				//일단 모든 버튼의 on을 지워서 비활성화
				for (const btn of btns) btn.classList.remove('on');
				//현재 idx순번의 버튼만 on을 붙여서 활성화
				btns[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	//자식 Btns컴포넌트를 통해서 Index 값이 변경될때마다
	//pos.current 배열값에 저장한 세로위치값으로 new Anime 스크롤 모션처리
	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[Index],
			duration: 500,
		});
	}, [Index]);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Btns setIndex={setIndex} />
		</main>
	);
}

export default Main;
