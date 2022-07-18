import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

function Menu() {
	const [Open, setOpen] = useState(true);
	const active = { color: 'aqua' };

	return (
		<AnimatePresence>
			{Open && (
				<nav id='mobileGnb'>
					<h1>
						<Link to='/'>
							<img src={url} alt='logo' />
						</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
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
						<li>
							<NavLink to='/members' activeStyle={active}>
								MemberShip
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
