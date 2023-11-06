// import { useState } from 'react';
import { useReducer } from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';

const INCREMENT_COUNT = 'increment';
const SET_VALUE_TO_ADD = 'set-value-to-add';
const DECREMENT_COUNT = 'decrement';
const ADD_VALUE_TO_COUNT = 'add-value-to-count';

const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT_COUNT:
            return {
                ...state,
                count: state.count + 1,
            };
        case DECREMENT_COUNT:
            return {
                ...state,
                count: state.count - 1,
            };
        case ADD_VALUE_TO_COUNT:
            return {
                ...state,
                count: state.count + state.valueToAdd,
                valueToAdd: 0
            }
        case SET_VALUE_TO_ADD:
            return {
                ...state,
                valueToAdd: action.payload,
            }
        default:
            return state;
        // throw new Error(`Unknown action type: ${action.type}`);

    }
};

function CounterPage({ initialCount }) {

    // const [count, setCount] = useState(initialCount);
    // const [valueToAdd, setValueToAdd] = useState(0);
    const [state, dispatch] = useReducer(reducer, {
        count: initialCount,
        valueToAdd: 0
    });
    console.log(state);

    const increment = () => {
        // setCount(count + 1);
        dispatch({
            type: INCREMENT_COUNT
        });
    };
    const decrement = () => {
        // setCount(count - 1);
        dispatch({
            type: DECREMENT_COUNT
        });
    };
    const handleChange = (event) => {

        // if first argument is not a number, then return 0
        const value = parseInt(event.target.value) || 0;

        dispatch({
            type: SET_VALUE_TO_ADD,
            payload: value
        });
    };
    // setValueToAdd(value);


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: ADD_VALUE_TO_COUNT,
        });
    };

    // setCount(count + valueToAdd)
    // setValueToAdd(0);

    return (
        <Panel className='m-3'>
            <h1 className='text-lg'>Count {state.count} times</h1>
            <div className='flex flex-row'>
                <Button onClick={increment} >Increment</Button>
                <Button onClick={decrement} >Decrement</Button>
            </div>

            <form onSubmit={handleSubmit}>
                <label>Add a lot!</label>
                <input
                    value={state.valueToAdd || ''}
                    onChange={handleChange}
                    type='number'
                    className='p-1 m-3 bg-gray-50 border border-gray-400' />
                <Button>Add it!</Button>
            </form>
        </Panel>
    )
}

export default CounterPage;