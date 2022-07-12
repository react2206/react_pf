import Layout from '../common/Layout';
import { useState } from 'react';

function Members() {
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);

	//현재입력하고 있는 입풋값을 state에 저장함수
	const handleChange = (e) => {
		const { name, value } = e.target;

		//객체에서 키값은 변수로 지정이 안됨 (es5)
		//객체에서 키값에 변수를 치환하고자 할때는 키변수명을 대괄호로 감싸줌 (es6)
		// [name] === 'userid'
		setVal({ ...Val, [name]: value });
	};

	return (
		<Layout name={'Members'}>
			<form>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
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
								</td>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
