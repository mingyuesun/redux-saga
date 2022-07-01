import runSaga from './runSaga'
import EventEmitter from 'events'

export default function createSagaMiddleware() {
	// 用来处理发布订阅
	const channel = new EventEmitter()
	let boundSaga
	function sagaMiddleware({getState, dispatch}) {
		boundSaga = runSaga.bind(null, { channel, getState, dispatch })
		return function(next) {
			return function(action) { // 这个方法即为中间件改造后的 dispatch 方法
				const result = next(action)
				// 发布或者触发事件，事件类型就是动作类型，传给回调的参数是 action 动作
				channel.emit(action.type, action)
				return result
			}
		}
	}
	sagaMiddleware.run = (saga) => boundSaga(saga)
	return sagaMiddleware
}