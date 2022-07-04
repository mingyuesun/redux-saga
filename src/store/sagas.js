import { put, take, fork } from '../redux-saga/effects' // 指令对象
import { ADD, ASYNC_ADD } from './action-types'

function delay(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}
function* addWorkerSaga() {
	yield delay(1000)
	yield put({type: ADD})
}

function* watcherSaga() {
	yield take(ASYNC_ADD)
	yield fork(addWorkerSaga)
	console.log('done')
}

export default function* rootSaga() {
	yield watcherSaga()
}
