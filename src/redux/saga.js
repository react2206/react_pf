import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchMembers, fetchYoutube } from './api';

//flickr saga설정
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//youtube saga설정
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}

//members saga설정
export function* returnMembers() {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.members });
	} catch (err) {
		yield put({ type: 'MEMBERS_ERROR', payload: err });
	}
}
export function* callMembers() {
	yield takeLatest('MEMBERS_START', returnMembers);
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callMembers), fork(callYoutube)]);
}
