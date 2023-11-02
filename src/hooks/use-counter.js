import { useState, useEffect } from 'react';

function useCounter(initialCount) {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    const increment = () => {
        setCount(count + 1)
    };

    return {
        count,
        increment
    }
}

export default useCounter;
