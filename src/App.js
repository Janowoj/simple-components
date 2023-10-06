import { GoBell, GoCheckCircle, GoDownload } from "react-icons/go";
import Button from './Button';

function App() {
    return <div>
        <div>
            <Button primary rounded>
                <GoBell />
                Click!
            </Button>
        </div>
        <div>
            <Button secondary rounded>
                <GoCheckCircle />
                Buy now!</Button>
        </div>
        <div>
            <Button success rounded outline>More info!</Button>
        </div>
        <div>
            <Button danger rounded>Remove!</Button>
        </div>
        <div>
            <Button warning rounded outline>
                <GoDownload />
                Download!</Button>
        </div>
    </div>

}

export default App;