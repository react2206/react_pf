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

	const showPrev = () => {
		panel_li = panel.current.children;
		const len = panel_li.length;
		const currentEl = panel.current.querySelector('.on');
		const current_index = Array.from(panel_li).indexOf(currentEl);
		let prev_index = null;
		current_index !== 0
			? (prev_index = current_index - 1)
			: (prev_index = len - 1);

		showSlide(currentEl, prev_index, -1);
	};

	const showSlide = (el, index, direction) => {
		new Anime(el, {
			prop: 'left',
			value: -direction * 100 + '%',
			duration: 500,
			callback: () => {
				el.classList.remove('on');
				el.style.display = 'none';
			},
		});

		panel_li[index].style.display = 'flex';
		panel_li[index].style.left = direction * 100 + '%';

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
