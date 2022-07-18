import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		Open
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [Open]);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='pop'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
					exit={{
						opacity: 0,
						scale: 0,
						transition: { duration: 0.5, delay: 0.5 },
					}}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ opacity: 0, transition: { duration: 0.5 } }}>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ x: 100, opacity: 0 }}
						animate={{
							x: 0,
							opacity: 1,
							transition: { duration: 0.5, delay: 0.5 },
						}}
						exit={{ opacity: 0, x: 100 }}>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Popup;
