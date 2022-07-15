import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

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
		<>
			{Open && (
				<aside className='pop'>
					<div className='con'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Popup;
