import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Pics({ Scrolled, start, base }) {
	const position = Scrolled - start - base || 0;
	const flickr = useSelector((store) => store.flickr.data);
	const [Index, setIndex] = useState(0);
	const pop = useRef(null);
	const openPop = (index) => {
		pop.current.open();
		setIndex(index);
	};

	return (
		<>
			<section id='pics' className='myScroll'>
				<p
					style={{
						left: 100 + position,
					}}>
					FLICKR
				</p>
				<h3
					style={{
						left: 100 + position / 2,
					}}>
					FLICKR
				</h3>

				<ul>
					{flickr.map((pic, idx) => {
						if (idx >= 5) return;
						return (
							<li key={idx} onClick={() => openPop(idx)}>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={pic.title}
								/>
							</li>
						);
					})}
				</ul>
			</section>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${flickr[Index].server}/${flickr[Index].id}_${flickr[Index].secret}_b.jpg`}
						alt={flickr[Index].title}
					/>
				)}
			</Popup>
		</>
	);
}

export default Pics;
