import { TAKE, PUT } from './effectTypes'

export function take(actionType) {
	// 等待有人向 store 派发 actionType 这个类型的动作，派发后才会让当前的 saga 继续执行，否则就停在这
	return { type: TAKE, actionType }
}

export function put(action) {
	return { type: PUT, action }
}