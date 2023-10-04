Components:

# Button

Whenever we have a component that is really just trying to create the exact same plain HTML equivalent element, we might refer to the component as the wrapper and the plain element here as the UNDERLYING ELEMENT.

We don't need this:

function App() {
    return <div>
        <div>
            <Button text='Click here!' />
        </div>
    </div>
}

We will use CHILDREN instead in the CUSTOM COMPONENT:

function App() {
    return <div>
        <div>
            <Button>Click here!</Button>
        </div>
    </div>
}
