import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchMembers, fetchYoutube } from './api';
import * as types from './actionType';

//flickr saga설정
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.err, payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

//youtube saga설정
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.err, payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//members saga설정
export function* returnMembers() {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.err, payload: err });
	}
}
export function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callMembers), fork(callYoutube)]);
}
