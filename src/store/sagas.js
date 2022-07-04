import { put, takeEvery, cps } from '../redux-saga/effects' // 指令对象
import { ADD, ASYNC_ADD } from './action-types'

//为了方便测试，希望产出的都是普通对象
// function delay(ms) {
// 	return new Promise(resolve => {
// 		setTimeout(resolve, ms)
// 	})
// }
function delay(ms, callback) {
	setTimeout(() => {
		callback("错误对象", 'ok')
	}, ms)
}
function* addWorkerSaga() {
	// yield delay(1000)
	// yield call(delay, 1000)
	try {
		yield cps(delay, 1000)
	} catch (error) {
		console.error(error)
	}
	yield put({type: ADD})
}

function* watcherSaga() {
	// 监听每一次的 ASYNC_ADD 动作，每次派发动作都会执行 addWorkerSaga 
	yield takeEvery(ASYNC_ADD, addWorkerSaga)
	console.log('done')
}

export default function* rootSaga() {
	yield watcherSaga()
}
