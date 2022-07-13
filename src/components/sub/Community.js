import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

	//로컬스토리지에 있는 데이터를 가져와서 다시 JSON객체로 parsing해서 리턴하는 함수
	const getLocalData = () => {
		const dummyPosts = [
			{ title: 'Hello5', content: 'Here comes description  in detail.' },
			{ title: 'Hello4', content: 'Here comes description  in detail.' },
			{ title: 'Hello3', content: 'Here comes description  in detail.' },
			{ title: 'Hello2', content: 'Here comes description  in detail.' },
			{ title: 'Hello1', content: 'Here comes description  in detail.' },
		];
		const data = localStorage.getItem('post');

		if (data) {
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};

	//초기 Posts스테이트에 로컬스토리지의 데이터를 가져와서 저장
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	//폼요소 초기화 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
		if (inputEdit.current) {
			inputEdit.current.value = '';
			textareaEdit.current.value = '';
		}
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
		//filter기존 배열을 복사해서 filtering (전개연산자를 쓰지 않아도 불변성 유지)
		//파라미터로 전달된 index순번만 제외만 나머지 데이터들만 필터링해서 반환
		setPosts(Posts.filter((_, idx) => idx !== index));
	};

	//글 수정모드 변경함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//글 출력모드 변경함수
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	//실제 글 수정함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('수정할 제목과 본문을  모두 입력하세요');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
	};

	//Posts의 값이 변경될때마다 콘솔출력
	useEffect(() => {
		console.log(Posts);
		//Posts스테이트값이 변경될때마다 다시 문자열로 변환해서 로컬스토리지에 저장
		localStorage.setItem('post', JSON.stringify(Posts));
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
							{post.enableUpdate ? (
								//반복도는 포스트에 enableUpdate=true값이 있으면 수정모드로 랜더링
								<>
									<div className='editTxt'>
										<input
											type='text'
											defaultValue={post.title}
											ref={inputEdit}
										/>
										<br />
										<textarea
											cols='30'
											rows='4'
											defaultValue={post.content}
											ref={textareaEdit}></textarea>
										<br />
									</div>
									<div className='btnSet'>
										{/* 버튼셋도 수정취소, 수정적용으로 변경 */}
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</div>
								</>
							) : (
								//반복도는 포스트에 enableUpdate=true값이 없으면 일반 출력모드로 랜더링
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELELTE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
