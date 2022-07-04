import { put, take, delay, fork, cancel } from '../redux-saga/effects' // 指令对象
import { ADD, STOP } from './action-types'

function* add() {
	while(true) {
		yield delay(1000)
		yield put({ type: ADD })
	}
}

function* addWatcher() {
	const task = yield fork(add)
	yield take(STOP)
	yield cancel(task)
}

export default function* rootSaga() {
	yield addWatcher()	
}
