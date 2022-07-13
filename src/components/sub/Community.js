import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	//글저장 함수
	const createPost = () => {};

	//Posts의 값이 변경될때마다 콘솔출력
	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='5'
					placeholder='본문을 입력하세요'
					ref={textarea}></textarea>
				<br />

				<button>CANCEL</button>
				<button onClick={createPost}>WRITE</button>
			</div>
		</Layout>
	);
}

export default Community;
