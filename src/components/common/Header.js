import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useRef } from 'react';

function Header(props) {
	const menu = useRef(null);
	const active = { color: 'orange' };
	let url = '';
	props.type === 'main'
		? (url = process.env.PUBLIC_URL + '/img/logo_w.png')
		: (url = process.env.PUBLIC_URL + '/img/logo_b.png');

	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<Link to='/'>
							<img src={url} alt='logo' />
						</Link>
					</h1>

					<ul id='gnb'>
						{/* <li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li> */}
						<li>
							<NavLink to='/flickr' activeStyle={active}>
								Flickr
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								Location
							</NavLink>
						</li>
						{/* <li>
							<NavLink to='/location2' activeStyle={active}>
								Location2
							</NavLink>
						</li> */}
						<li>
							<NavLink to='/members' activeStyle={active}>
								MemberShip
							</NavLink>
						</li>
					</ul>

					<FontAwesomeIcon
						icon={faBars}
						onClick={() => {
							console.log(menu.current);
							menu.current.toggle();
						}}
					/>
				</div>
			</header>

			<Menu ref={menu} />
		</>
	);
}

export default Header;
