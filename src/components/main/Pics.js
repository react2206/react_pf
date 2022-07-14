function Pics({ Scrolled, start, base }) {
	const position = Scrolled - start - base || 0;

	return (
		<section id='pics' className='myScroll'>
			<p
				style={
					position >= 0
						? {
								left: 100 + position,
						  }
						: null
				}>
				FLICKR
			</p>
		</section>
	);
}

export default Pics;
