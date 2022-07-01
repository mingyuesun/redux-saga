import { put, take } from '../redux-saga/effects' // 指令对象
import { ADD, ASYNC_ADD, MINUS, ASYNC_MINUS } from './action-types'

function delay(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}
function* addWorkerSaga() {
	yield delay(1000)
	yield put({type: ADD})
}

function* minusWorkerSaga() {
	yield delay(1000)
	yield put({type: MINUS})
}

function* watcherSaga() {
	// 监听用户派发的 ASYNC_ADD 和 ASYNC_MINUS 动作，监听到之后会继续执行，没有监听到之前会在此暂停
	// teka 只会监听一次，一旦监听到就往下执行，不会再次执行
	yield take(ASYNC_ADD)
	yield addWorkerSaga()
	yield take(ASYNC_MINUS)
	yield minusWorkerSaga()
	console.log('done')
}

export default function* rootSaga() {
	yield watcherSaga()
}
