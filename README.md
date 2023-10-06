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

# prop-types library:

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

## Tailwind CSS

It is different from Bootstrap, Bulma etc. 

Instead of giving many classNames to the elements, we will use only some different classNames that have individual singular styling rules attached to them.

Each of these different selectors is going give us almost always a single styling rule.

Why do we need it?

// - Components get harder to read.
// - We have to write a lot of classNames.
// - Some normal CSS features don't work well with Tailwind CSS.

But className soup is going to FORCE us to write smaller and more reusable components!!!

// Installing Tailwind CSS:

https://tailwindcss.com/docs/guides/create-react-app

// 1. npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file.

// 2. Add this path to the tailwind.config.js:

content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

// 3. Create index.css file in the src folder.

// 4. Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file:

@tailwind base;
@tailwind components;
@tailwind utilities;

// 5. In the index.js import the index.css file:
import './index.css';

// 6. Run your build process with:
npm run start



// Important: 
- we have to install the postcss and autoprefixer packages as well.
- Tailwind releases new version very often, so we have to update it in the future.
- All the styling we are going to use is unlikely to change
- Setup directions might change by the time







