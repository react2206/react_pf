import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

//컴포넌트에서 받은 인수값을 api.js에 있는 axios함수에 연결하는 함수
export function* returnFlickr(action) {
	const response = yield call(fetchFlickr, action.Opt);
	console.log(response);
	yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}

//요청받은 액션타입에 따라 함수호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
