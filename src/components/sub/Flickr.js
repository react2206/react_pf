import Layout from '../common/Layout';
import { useRef } from 'react';
import { useSelector } from 'react';
import Masonry from 'react-masonry-component';

function Flickr() {
	const frame = useRef(null);
	const { flickr } = useSelector((store) => store.flickrReducer);
	const masonryOptions = { transitionDuration: '0.5s' };

	return (
		<Layout name={'Flickr'}>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
					{flickr.map((pic, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
											alt={pic.title}
										/>
									</div>
									<h2>{pic.title}</h2>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}

export default Flickr;
