import Layout from '../common/Layout';
import { useState } from 'react';

function Members() {
	//userid의 입력값이 담길 초기 state를 객체로 지정
	const initVal = {
		userid: '',
	};
	//해당 객체값을 Val state에 초기값으로  저장
	const [Val, setVal] = useState(initVal);

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
										//Val state에 있는 userid값을 input요소에 출력
										value={Val.userid}
										onChange={(e) => {
											console.log(e.target.value);
											//onChange이벤트가 발생할때마다 기존Val state값을 복사해서 현재 입력하고 있는 값으로 바꿔치기
											setVal({ ...Val, userid: e.target.value });
										}}
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
