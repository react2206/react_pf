import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { fetchMembers } from './redux/memberSlice';

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

	useEffect(() => {
		dispatch(fetchMembers());
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'interest' }));
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
