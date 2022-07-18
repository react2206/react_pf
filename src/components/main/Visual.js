import Anime from '../../asset/anim';
import { useRef } from 'react';

function Visual() {
	return (
		<figure id='visual' className='myScroll on'>
			<video
				loop
				muted
				autoPlay
				src={process.env.PUBLIC_URL + '/img/vid.mp4'}></video>
		</figure>
	);
}

export default Visual;
