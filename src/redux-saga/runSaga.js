import { TAKE, PUT, FORK } from './effectTypes'
export default function runSaga(env, saga) {
	const { channel, dispatch } = env
	// 如果 saga 是生成器，执行一下得到迭代器；如果已经是迭代器了，就直接用
	let it = typeof saga === 'function' ? saga() : saga
	function next(value) {
		let { value: effect, done } = it.next(value)
		if (!done) {
			// 如果 value 或者 effect 是一个迭代器
			if (typeof effect[Symbol.iterator] === 'function') {
				runSaga(env, effect)
				next()
			} else if (effect instanceof Promise) {
				effect.then(next)
			} else {
				switch(effect.type) {
					case TAKE:
						// 订阅 actionType 这个事件，回调是 next channel eventEmitter 实例
						channel.once(effect.actionType, next)  // 有些指令不会自动向下执行，比如 take
						break
					case PUT:
						dispatch(effect.action) // 有些指令不受阻塞，会继续向下执行，比如 put
						next()
						break
					case FORK:
						runSaga(env, effect.saga)
						next()
						break	
					default:
						break
				}
			}
		}
	}
	next()
}