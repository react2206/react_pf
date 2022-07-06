import React from 'react';

function Header() {
	return (
		<header>
			<div className='inner'>
				<h1>
					<a href='#'>LOGO</a>
				</h1>

				<ul id='gnb'>
					<li>
						<a href='#'>Department</a>
					</li>
					<li>
						<a href='#'>Gallery</a>
					</li>
					<li>
						<a href='#'>Youtube</a>
					</li>
					<li>
						<a href='#'>Community</a>
					</li>
					<li>
						<a href='#'>Location</a>
					</li>
					<li>
						<a href='#'>MemberShip</a>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
