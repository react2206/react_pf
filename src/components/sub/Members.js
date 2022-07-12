import Layout from '../common/Layout';
import { useEffect, useState } from 'react';

function Members() {
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);
	//인증조건실패시 출력될 에러 메세지가 항목별로 담길 state추가
	const [Err, setErr] = useState({});

	//인증처리 함수
	const check = (value) => {
		const errs = {};

		//userid 인증처리
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	//submit이벤트 발생시
	const handleSubmit = (e) => {
		//일단은 서버전송을 막아주고
		e.preventDefault();
		//check함수에 인수로 Val값을 넣어서 인증검사후
		//반환된 에러객체값을 Err state에 옮겨담음
		setErr(check(Val));
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<Layout name={'Members'}>
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
										value={Val.userid}
										onChange={handleChange}
									/>
									{/* 혹시 에러가 있으면 Err정보값 화면에 출력 */}
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
