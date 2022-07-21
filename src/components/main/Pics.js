import { useSelector } from 'react-redux';

function Pics({ Scrolled, start, base }) {
	const position = Scrolled - start - base || 0;
	const { flickr } = useSelector((store) => store.flickrReducer);

	return (
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
						<li key={idx}>
							<img
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								alt={pic.title}
							/>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
