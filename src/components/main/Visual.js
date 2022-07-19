import Anime from '../../asset/anim';
import { useRef } from 'react';

function Visual() {
	return (
		<figure id='visual' className='myScroll on'>
			<ul className='panel'>
				<li className='s1 on'>1</li>
				<li className='s2'>2</li>
				<li className='s3'>3</li>
				<li className='s4'>4</li>
				<li className='s5'>5</li>
			</ul>

			<ul className='navi'>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

			<button className='prev'>prev</button>
			<button className='next'>next</button>
		</figure>
	);
}

export default Visual;
