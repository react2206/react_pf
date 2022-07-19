import Anime from '../../asset/anim';
import { useRef, useState } from 'react';

function Visual() {
	const panel = useRef(null);
	let panel_li = null;

	const showNext = () => {
		panel_li = panel.current.children;
		const len = panel_li.length;
		const currentEl = panel.current.querySelector('.on');
		const current_index = Array.from(panel_li).indexOf(currentEl);
		let next_index = null;
		current_index !== len - 1
			? (next_index = current_index + 1)
			: (next_index = 0);

		showSlide(currentEl, next_index, 1);
	};

	const showSlide = (el, index, direction) => {
		//기존 활성화 패널이 왼쪽 바깥으로 사라지는 모션
		new Anime(el, {
			prop: 'left',
			value: -direction * 100 + '%',
			duration: 500,
			callback: () => {
				el.classList.remove('on');
				el.style.display = 'none';
			},
		});

		//다음 활성화될 패널이 순간적으로 보임처리해서 오른쪽 밖에 배치
		panel_li[index].style.display = 'flex';
		panel_li[index].style.left = direction * 100 + '%';

		//다음 활설화 패널이 프레임 안쪽에 배치되도록 설정
		new Anime(panel_li[index], {
			prop: 'left',
			value: '0%',
			duration: 500,
			callback: () => {
				panel_li[index].classList.add('on');
			},
		});
	};

	return (
		<figure id='visual' className='myScroll on'>
			<ul className='panel' ref={panel}>
				<li className='s1 on'>1</li>
				<li className='s2'>2</li>
				<li className='s3'>3</li>
				<li className='s4'>4</li>
				<li className='s5'>5</li>
			</ul>

			<ul className='navi'>
				<li className='on'></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

			<button className='prev'>prev</button>
			<button className='next' onClick={showNext}>
				next
			</button>
		</figure>
	);
}

export default Visual;
