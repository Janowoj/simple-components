import { useState, useEffect } from 'react';
import Button from '../components/Button';

function CounterPage({ initialCount }) {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold mb-4">Counter Page</h1>
            <p className="text-2xl mb-4">You clicked {count} times</p>
            <Button onClick={handleClick} >Increment</Button>
        </div>
    )
}

export default CounterPage;