import { put, take, all } from '../redux-saga/effects' // 指令对象
import { ADD, ASYNC_ADD } from './action-types'

function* add1() {
	for (let i = 0; i < 1; i++) {
		yield take(ASYNC_ADD)
		yield put({ type: ADD })
	}
	console.log('add1 done')
	return 'add1Result'
}

function* add2() {
	for (let i = 0; i < 2; i++) {
		yield take(ASYNC_ADD)
		yield put({ type: ADD })
	}
	console.log('adde done')
	return 'add2Result'
}

export default function* rootSaga() {
	const result = yield all([add1(), add2()])
	console.log('rootSaga done', result)
}
