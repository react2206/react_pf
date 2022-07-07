function Layout(props) {
	return (
		<section className='content'>
			<figure></figure>
			<div className='inner'>
				<h1>Sub Title</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
