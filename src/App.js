import { Route } from 'react-router-dom';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />
				<Content />
			</Route>

			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />

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
