import Anime from '../../asset/anim';
import { useEffect, useRef, useState } from 'react';

function Visual() {
	//각각 panel, navi ul을 담음 참조객체 생성
	const panel = useRef(null);
	const navi = useRef(null);

	//전역으로 쓰일 panel_li, len변수만 선언
	let panel_li = null;
	let len = null;

	//버튼 클릭시 순서값이 담길 state생성
	const [Index, setIndex] = useState(0);
	//모션중 재이벤트 방지를 위한  state생성
	const [EnableClick, setEnableClick] = useState(true);

	//이벤트 발생시 현재 활성화되어있는 패널과 그 순번값을 반환하는 함수
	const init = () => {
		panel_li = panel.current.children;
		len = panel_li.length;
		const currentEl = panel.current.querySelector('.on');
		const current_index = Array.from(panel_li).indexOf(currentEl);
		return [currentEl, current_index];
	};

	//next버튼 클릭시 활성화될 다음패널 찾아서 showSlide 호출하는 함수
	const showNext = () => {
		const [currentEl, current_index] = init();
		let next_index = null;
		current_index !== len - 1
			? (next_index = current_index + 1)
			: (next_index = 0);

		if (EnableClick) showSlide(currentEl, next_index, 1);
	};

	//preev버튼 클릭시 활성화될 이전패널 찾아서 showSlide 호출하는 함수
	const showPrev = () => {
		const [currentEl, current_index] = init();
		let prev_index = null;
		current_index !== 0
			? (prev_index = current_index - 1)
			: (prev_index = len - 1);

		if (EnableClick) showSlide(currentEl, prev_index, -1);
	};

	//navi버튼 클릭시 클릭한 순번과 기존 활성화된 순번의 크기를 비교해서 prev, next slide방향 결정하는 함수
	const showIndex = (index) => {
		const [currentEl, current_index] = init();
		const target_index = index;

		if (!EnableClick) return;
		if (target_index > current_index) showSlide(currentEl, target_index, 1);
		if (target_index < current_index) showSlide(currentEl, target_index, -1);
	};

	//앞으로 활성화될 순번의 패널을 슬라이드 모션처리하는 함수
	const showSlide = (el, index, direction) => {
		setEnableClick(false);

		//기존 패널 프레임밖으로 슬라이드 아웃 모션
		new Anime(el, {
			prop: 'left',
			value: -direction * 100 + '%',
			duration: 500,
			callback: () => {
				el.classList.remove('on');
				el.style.display = 'none';
			},
		});

		//앞으로 활성화될 패널 프레임 양끝에 순간적으로 배치해서 모션준비시작
		panel_li[index].style.display = 'flex';
		panel_li[index].style.left = direction * 100 + '%';

		//앞으로 활성화될 패널 프레임안으로 슬라이드인 모션
		new Anime(panel_li[index], {
			prop: 'left',
			value: '0%',
			duration: 500,
			callback: () => {
				panel_li[index].classList.add('on');
				setEnableClick(true);
			},
		});

		//모션이 동작될때마다 현재 활성화 순번 Index state에 저장
		setIndex(index);
	};

	//Index state가 변경될때마다 버튼활성화
	useEffect(() => {
		for (const el of navi.current.children) el.classList.remove('on');
		navi.current.children[Index].classList.add('on');
	}, [Index]);

	return (
		<figure id='visual' className='myScroll on'>
			<ul className='panel' ref={panel}>
				<li className='s1 on'>1</li>
				<li className='s2'>2</li>
				<li className='s3'>3</li>
				<li className='s4'>4</li>
				<li className='s5'>5</li>
			</ul>

			<ul className='navi' ref={navi}>
				{[0, 1, 2, 3, 4].map((num) => {
					return <li key={num} onClick={() => showIndex(num)}></li>;
				})}
			</ul>

			<button className='prev' onClick={showPrev}>
				prev
			</button>
			<button className='next' onClick={showNext}>
				next
			</button>
		</figure>
	);
}

export default Visual;
