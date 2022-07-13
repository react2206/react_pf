import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const dummyPosts = [
		{ title: 'Hello5', content: 'Here comes description  in detail.' },
		{ title: 'Hello4', content: 'Here comes description  in detail.' },
		{ title: 'Hello3', content: 'Here comes description  in detail.' },
		{ title: 'Hello2', content: 'Here comes description  in detail.' },
		{ title: 'Hello1', content: 'Here comes description  in detail.' },
	];

	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState(dummyPosts);

	//폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	//글저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([
			...Posts,
			{ title: input.current.value, content: textarea.current.value },
		]);
		resetForm();
	};

	//글삭제 함수
	const deletePost = (index) => {
		console.log(index);
		//filter기존 배열을 복사해서 filtering (전개연산자를 쓰지 않아도 불변성 유지)
		//파라미터로 전달된 index순번만 제외만 나머지 데이터들만 필터링해서 반환
		setPosts(Posts.filter((post, idx) => idx !== index));
	};

	//글 수정모드 변경함수
	const enableUpdate = (index) => {
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

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

				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>

							<div className='btnSet'>
								<button onClick={() => enableUpdate(idx)}>EDIT</button>
								<button onClick={() => deletePost(idx)}>DELELTE</button>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
