import Button from './Button';

function App() {
    return <div>
        <div>
            <Button primary rounded>Click!</Button>
        </div>
        <div>
            <Button secondary rounded>Buy now!</Button>
        </div>
        <div>
            <Button success rounded outline>More info!</Button>
        </div>
        <div>
            <Button danger rounded>Remove!</Button>
        </div>
        <div>
            <Button warning rounded outline>Hide ads!</Button>
        </div>
    </div>

}

export default App;