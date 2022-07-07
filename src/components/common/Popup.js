function Popup(props) {
	return (
		<aside className='pop'>
			<div className='con'>{props.children}</div>
			<span className='close' onClick={() => props.setOpen(false)}>
				close
			</span>
		</aside>
	);
}

export default Popup;
