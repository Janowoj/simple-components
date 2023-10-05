Components:

# Button

// Whenever we have a component that is really just trying to create the exact same plain HTML equivalent element, we might refer to the component as the wrapper and the plain element here as the UNDERLYING ELEMENT.

We don't need this:

function App() {
    return <div>
        <div>
            <Button text='Click here!' />
        </div>
    </div>
}

// We will use CHILDREN instead in the CUSTOM COMPONENT.
App.js:

function App() {
    return <div>
        <div>
            <Button>Click here!</Button>
        </div>
    </div>
}

Button.js:

function Button({ children }) {
    return <button>{children}</button>;
}

export default Button;


// Button props design:

rounded: {true} or {false}
outline: {true} or {false}

(purpose = 'primary' or 'secondary' or 'danger' or 'success') 
or
primary: {true}
secondary: {true}
danger: {true}
success: {true}
warning: {true}

This can cause a conflict!

// We can do this:

<Button primary={true}>Click!</Button>

// Like this (it is boolean, so we don't need to write {true})

<Button primary>Click!</Button>

// We have to add a little bit of a check in the Button components (only one of the props can be true).
For this purpose we will use the PROP-TYPES LIBRARY.

// prop-types library:

It is JS library to validate the props that get passed into your component.

If someone passes down a prop that is not valid (number instead of boolean), we will get a warning in the console.

Used to be very popular. Now TypeScript is more popular.

// Install:

https://www.npmjs.com/package/prop-types

npm install prop-types

e.g.:

// Card.js:

import PropTypes from 'prop-types';

function Card({ title, content, showImage }) {
    return <div>
        <h2>{title}</h2>
        <p>{paragraph}</p>
        {showImage && <img src='https://picsum.photos/200/300' />}
    </div>
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    showImage: PropTypes.bool
}

export default Card;

// isRequired: if we don't pass down the prop, we will get a warning in the console.

// uf there is no isRequired, like in the case of content, this prop is optional, but it has to be a string.

// Validating the props, if there is only one of them that can be true:

customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Writing CUSTOM VALIDATORS:

  It does not matter what key we assign that checker to.
  We can assign our custom validator to any key we want.

  For this purpose we will create Button.propTypes object e.g.:

  Button.proptypes = {
      checkVariationValue(props) {
        return new Error ('Invalid prop value')
      }
  }

  To check the value prop is true we will use Number(true) -> 1
  Number(!!undefined) -> 0

  // When writing:

   <div>
            <Button success primary rounded outline>Click!</Button>
        </div>

// We will get a warning in the console!

Prop types does not break anything, it just gives us a little print up of a warning.







