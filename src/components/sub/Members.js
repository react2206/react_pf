import Layout from '../common/Layout';
import { useEffect, useState } from 'react';

function Members() {
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	//순서7- 인수로 받은 state값을 검사해서 조건이 불일치하면 내부 지역변수 객체에 에러문구를 담아서 리턴
	const check = (value) => {
		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		return errs;
	};

	const handleChange = (e) => {
		//순서2- 입력하고 있는 input요소의 name, value값을 변수로 빕구조화 할당
		const { name, value } = e.target;
		//순서3 - 비구조화할당으로 받은 값을 Val 스테이트에 저장
		//이때 객체 키값을 변수로 활용하기 위해서 []감싸줌
		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = (e) => {
		//순서6 - 일단 서버전송의 기본 이벤트 기능 막아주고
		//check함수에 Val스테이트값을 인수로 전달해 인증검사 시작
		e.preventDefault();
		//순서8- 반환된 에러객체를 Err스테이트에 옮겨담음
		setErr(check(Val));
	};

	//순서9 Err객체값이 변경될때마다 콘솔출력
	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<Layout name={'Members'}>
			{/* 순서5 - 전송버튼 클릭시 handleSubmit함수 호출 */}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										placeholder='아이디를 입력하세요'
										name='userid'
										id='userid'
										//순서4 - Val 스테이트값이 변경될때마다 input화면에 출력
										value={Val.userid}
										//순서1 - 인풋에 값 입력시 handleChange함수 호출
										onChange={handleChange}
									/>
									{/* 순서10 - 만약 에러객체가 생기면 화면에 출력 */}
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* btn set */}
							<tr>
								<th colSpan='2'>
									<input type='reset' />
									<input type='submit' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
