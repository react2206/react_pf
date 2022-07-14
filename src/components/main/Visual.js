import Anime from '../../asset/anim';
import { useRef } from 'react';

function Visual() {
	const btnStyle = {
		position: 'absolute',
		top: 150,
		left: 100,
	};
	return (
		<figure id='visual'>
			<button
				style={btnStyle}
				onClick={() => {
					new Anime(window, {
						prop: 'scroll',
						value: 1000,
						duration: 500,
					});
				}}>
				scroll
			</button>
		</figure>
	);
}

export default Visual;
