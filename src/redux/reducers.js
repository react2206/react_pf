import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'MEMBERS_START':
			return { ...state };

		case 'MEMBERS_SUCCESS':
			return { ...state, members: action.payload };

		case 'MEMBERS_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'YOUTUBE_START':
			return { ...state };

		case 'YOUTUBE_SUCCESS':
			return { ...state, youtube: action.payload };

		case 'YOUTUBE_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return { ...state };

		case 'FLICKR_SUCCESS':
			return { ...state, flickr: action.payload };

		case 'FLICKR_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickrReducer,
});

export default reducers;
