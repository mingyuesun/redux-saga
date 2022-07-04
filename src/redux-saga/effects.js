import { TAKE, PUT, FORK, CALL, CPS, ALL, CANCEL } from './effectTypes'

export function take(actionType) {
	// 等待有人向 store 派发 actionType 这个类型的动作，派发后才会让当前的 saga 继续执行，否则就停在这
	return { type: TAKE, actionType }
}

export function put(action) {
	return { type: PUT, action }
}

export function fork(saga) {
	return { type: FORK, saga }
}

export function takeEvery(actionType, saga) {
	function* takeEveryHelper() {
		while(true) {
			yield take(actionType)
			yield fork(saga)
		}
	}
	return fork(takeEveryHelper)
}

export function call(fn, ...args) {
	return { type: CALL, fn, args}
}

export function cps(fn, ...args) {
	return { type: CPS, fn, args }
}

export function all(iterators) {
	return { type: ALL, iterators }
}

function delayFn(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

export function delay(...args) {
	return call(delayFn, ...args)
}

export function cancel(task) {
	return { type: CANCEL, task }
}