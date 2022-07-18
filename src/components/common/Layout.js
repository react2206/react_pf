import { useEffect, useRef } from 'react';

function Layout(props) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${props.name}`} ref={frame}>
			<figure>
				<img
					src={`${process.env.PUBLIC_URL}/img/${props.name}.jpg`}
					alt={props.name}
				/>
			</figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
