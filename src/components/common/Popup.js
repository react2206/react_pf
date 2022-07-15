import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

/*
	단계1 - 기존의 컴포넌트 함수를 대입형(화살표) 함수로 변경
	단계2 - 해당 화살표함수를 forwardRef()의 인수로 전달
	단계3 - forwardRef로 전달되는 화살표함수의 두번째 파라미터로 ref 추가
	단계4 - forwardRef안쪽에 useImperativeHandle함수를 호출
	단계5 - 해당함수를 객체를 반환해서 해당 객체값을 부모컴포넌트로 전달
	단계6 - 부모컴포넌트에 useRef로 forwardRef로 전달되는 자식 컴포넌트를 참조
	단계7 - 참조 객체는 useImteratvieHandle이 리턴하는 객체를 지칭
*/

const Popup = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	return (
		<>
			{/* Open state를 자기자신이 가지고 있으므로 자기 자신 안쪽에서 조건문으로 컨텐츠 출력 유무를 결정 */}
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
