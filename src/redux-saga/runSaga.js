import { TAKE, PUT, FORK, CALL, CPS, ALL } from './effectTypes'
export default function runSaga(env, saga, callback) {
	const { channel, dispatch } = env
	// 如果 saga 是生成器，执行一下得到迭代器；如果已经是迭代器了，就直接用
	let it = typeof saga === 'function' ? saga() : saga
	function next(value, isError) {
		let result
		if (isError) {
			result = it.throw(value)
		} else {
			result = it.next(value)
		}
		let { value: effect, done } = result
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
					case CALL:
						effect.fn(...effect.args).then(next)
						break
					case CPS:
						effect.fn(...effect.args, (err, data) => {
							if (err) {
								next(err, true)
							} else {
								next(data)
							}
						})
						break
					case ALL:
						const { iterators } = effect
						let result = []
						let count = 0
						iterators.forEach((iterator, index) => {
							// 每完成一个 saga 后会执行回调
							runSaga(env, iterator, (data) => {
								result[index] = data
								if (++count === iterators.length) {
									next(result)
								}
							})
						})
						break		
					default:
						break
				}
			}
		} else {
			callback && callback(effect)
		}
	}
	next()
}