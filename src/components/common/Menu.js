import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'aqua' };

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobileGnb'
					initial={{ x: -320, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
					exit={{ x: -320, opacity: 0 }}
					onClick={() => setOpen(!Open)}>
					<h1>
						<Link to='/'>
							<img
								src={process.env.PUBLIC_URL + '/img/logo_w.png'}
								alt='logo'
							/>
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
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
