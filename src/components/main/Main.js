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
	const [Scrolled, setScrolled] = useState(0);
	let secs = null;
	let base = -window.innerHeight / 2;

	const getPos = () => {
		pos.current = [];
		secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
	};

	const activation = () => {
		base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.scroll_navi li');
		//현재 스크롤되는 거리값을 Scrolled state에 저장해서 관리
		setScrolled(scroll);

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
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
			{/* <News /> */}
			<Pics Scrolled={Scrolled} start={pos.current[2]} base={base} />
			<Vids />
			<Btns setIndex={setIndex} />
		</main>
	);
}

export default Main;
