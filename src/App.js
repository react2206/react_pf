import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers } from './redux/action';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Location2 from './components/sub/Location2';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';
import Flickr from './components/sub/Flickr';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();

	const fetchYoutube = () => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;
		axios.get(url).then((json) => {
			const action = setYoutube(json.data.items);
			dispatch(action);
		});
	};

	useEffect(() => {
		fetchYoutube();
		dispatch({ type: 'MEMBERS_START' });
		dispatch({
			type: 'FLICKR_START',
			Opt: { type: 'user', user: '164021883@N04' },
		});
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/location' component={Location} />
			<Route path='/location2' component={Location2} />
			<Route path='/members' component={Members} />
			<Route path='/flickr' component={Flickr} />

			<Footer />
		</>
	);
}

export default App;

/*
SSR vs CSR

SSR = Server side Rendering
-페이지 이동시마다 일일 서버쪽에 출력될  html 파일을 요청하는 방법
-장점 : 초기 로딩속도가 빠른편, 검색최적화된 방법
-단점 : 페이지 이동시, 같은 페이지 안에서 컨텐츠가 동적으로 바뀌어야 될때 사용성이 낮아서 불편

CSR = Client side Rendering
- 초기에 화면에 출력될 모든 정보 데이터를 chunk단위로 모두 불러옴
-장점 : 같은 페이지 안에서 서로 다른 컨텐츠를 실시간으로 변경하면서 출력되므로 속도가 빠름(다른컨텐츠를 실시간으로 보여주는 속도)
-단점 : 초기 로딩속도가 느림, 검색엔진 비최적화

*/
