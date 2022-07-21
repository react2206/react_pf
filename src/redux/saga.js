import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchMembers } from './api';

//flickr saga설정
export function* returnFlickr(action) {
	const response = yield call(fetchFlickr, action.Opt);
	console.log(response);
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//members saga설정
export function* returnMembers(action) {
	const response = yield call(fetchMembers, action.Opt);
	console.log(response);
	yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.members });
}
export function* callMembers() {
	yield takeLatest('MEMBERS_START', returnMembers);
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callMembers)]);
}
