import Accordion from '../components/Accordion';


function AccordionPage() {

    const items = [
        {
            id: 'g7i7r7',
            label: 'Can I use Tailwind CSS with React?',
            content: 'You can use Tailwind CSS with React and any other framework or library. Tailwind is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.'
        },
        {
            id: 'v4v64v',
            label: 'Can I use Bootstrap with React?',
            content: 'You can use Bootstrap with React. Bootstrap is a CSS framework. Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.'

        },
        {
            id: 'v546vaw',
            label: 'Can I use Bulma with React?',
            content: 'You can use Bulma with React. Bulma is a CSS library. This means it provides CSS classes to help you style your HTML code. To use Bulma, you can either use the pre-compiled .css file or install the .sass files so you can customize it to your needs.'

        }
    ]

    return <Accordion items={items} />;
}

export default App;