import Button from './Button';

function App() {
    return <div>
        <div>
            <Button success rounded outline>Click!</Button>
        </div>
        <div>
            <Button secondary rounded>Buy now!</Button>
        </div>
        <div>
            <Button secondary outline>More info!</Button>
        </div>
        <div>
            <Button danger outline>Remove!</Button>
        </div>
        <div>
            <Button warning >Hide ads!</Button>
        </div>
    </div>

}

export default App;