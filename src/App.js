import Accordion from './components/Accordion';


function App() {

    const items = [
        {
            id: 'g7i7r7',
            label: 'Can I use Tailwind CSS with React?',
            content: 'You can use Tailwind CSS with React and any other framework or library. '
        },
        {
            id: 'v4v64v',
            label: 'Can I use Bootstrap with React?',
            content: 'You can use Bootstrap with React. Bootstrap is a CSS framework.'

        },
        {
            id: 'v546vaw',
            label: 'Can I use Bulma with React?',
            content: 'You can use Bulma with React. Bulma is a CSS framework.'

        }
    ]

    return <Accordion items={items} />;
}

export default App;