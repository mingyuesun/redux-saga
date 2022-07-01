import React from 'react'
import { ADD, ASYNC_ADD, MINUS, ASYNC_MINUS } from '../store/action-types'
import { useDispatch, useSelector } from 'react-redux'

export default function Counter() {
	const number = useSelector(state => state.number)
	const dispatch = useDispatch()
	return (
		<div>
			<p>{number}</p>
			<button onClick={() => dispatch({type: ADD})}>ADD</button>
			<button onClick={() => dispatch({type: ASYNC_ADD})}>ASNYC_ADD</button>
			<button onClick={() => dispatch({type: MINUS})}>MINUS</button>
			<button onClick={() => dispatch({type: ASYNC_MINUS})}>ASNYC_MINUS</button>
		</div>
	)
}