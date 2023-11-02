import Button from '../components/Button';
import useCounter from '../hooks/use-counter';

function CounterPage({ initialCount }) {

    const { count, increment } = useCounter(initialCount);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold mb-4">Counter Page</h1>
            <p className="text-2xl mb-4">You clicked {count} times</p>
            <Button onClick={increment} >Increment</Button>
        </div>
    )
}

export default CounterPage;