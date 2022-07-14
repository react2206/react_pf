import Anime from '../../asset/anim';
import { useRef } from 'react';

const style = {
	width: 100,
	height: 100,
	backgroundColor: 'aqua',
	position: 'absolute',
	top: 200,
	left: 100,
};

const btn = {
	position: 'absolute',
	top: 120,
	left: 100,
};

function Visual() {
	const box = useRef(null);

	return (
		<figure id='visual'>
			<button
				style={btn}
				onClick={() => {
					new Anime(box.current, {
						prop: 'left',
						value: 1000,
						duration: 500,
						callback: () => {
							new Anime(box.current, {
								prop: 'top',
								value: 500,
								duration: 500,
							});
						},
					});
				}}>
				button
			</button>
			<div className='box' style={style} ref={box}></div>
		</figure>
	);
}

export default Visual;
