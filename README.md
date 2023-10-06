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

# Installing Tailwind CSS:

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

# Using Tailwind CSS:

// 1. Decide on a new styling rule we want to add to our component.
// 2. Go to tailwindcss.com/docs and find the styling rule we want to use.
// 3. Smash Control+K as hard as possible (joke).
// 4. Search for the styling rule we want to use.
// 5. Add appropriate className to your element.

# Review on Styling:

// 1. Tailwind is going to remove all of default styling from the elements in our browser.
// 2. We have to add all of the styling back in by using Tailwind CSS classes.

# classnames library:

// This is optional library;
// It is used to conditionally add classNames to the elements.
// Library is called 'classnames'. though prop is called 'className'.

# Installing classnames library:

npmjs.com/package/classnames

npm install classnames

# Using classnames library:

// 1.

If i pass in a string e.g.:
bg-blue-500, px-3, py-1.5
classnames library will return a string:
'bg-blue-500 px-3 py-1.5'

// 2. We can do something like this:

let bg-color = undefined;

if(primary) {
    bg-color = 'bg-blue-500';
}

classNames=(bg-color, 'px-3', 'py-1.5');

// 3. or this:

const primary = true;
const warning = false;

classNames = ({
    'bg-blue-500': primary,
    'bg-yellow-500': warning,
})

// 4. import propTypes from 'prop-types' REMOVED from the Button.js file.

// 5. import className from "classnames";
ADDED to the Button.js file.

// 6. When using dashes in the classNames we have to wrap them in QUOTES!!!

To check this, we write this:

const finalClassName = className('px-5', {
    'bg-red-500': true,
    'text-yellow-500': true,
})

console.log(finalClassName);

# tailwind-merge library:

npm install tailwind-merge

Button.js:
import { twMerge } from 'tailwind-merge';

const classes = twMerge(
    className('px-3 py-1.5 border', {
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger
    })
  );

  # React Icons:

  https://react-icons.github.io/react-icons/

  // This is a library of libraries of icons made by different people, e.g.:
  Bootstrap Icons, Font Awesome, Material Design Icons, etc.

  // Each library has consistent styling.

  // Some of these different sets of icons are sometimes not designed to be used with React. Thanks to this library we can use them with React.

// Install:

npm install react-icons

// Import:

in App.js e.g.:

import { IconName } from 'react-icons/fa';
import { IconName } from "react-icons/go";

etc.

# Adding CSS to the Button component:

We will add some CSS to the Button component (Tailwind CSS is not enough).

button > svg {
    margin-right: 5px;
}

# Sharing our Button component with the other developers:

// 1. We will receive feedback: 
' How can I add a click handler to the <Button/> ???'

// 2. We will add a click handler to the Button component:

Prop onClick has to be added to the Button component, but this special Button component renders plain HTML button element.
We have to pass somehow the onClick prop to the plain HTML button element (not the best solution):

App.js:

function App() {
    return <div>
        <div>
            <Button onClick={() => console.log('Clicked!')}>Click here!</Button>
        </div>
    </div>
}

Button.js:

function Button({ children, onClick }) {
    return <button onClick={onClick}>{children}</button>;
}

export default Button;

// 3. We will immadiately receive another feedback:

'How can I add a mouseover event handler to the <Button/> ???'

// 4. Again, we will add a mouseover event handler to the Button component.

// 5. We will receive another feedback, and another, and another...

# Sharing our Button component with the other developers - SOLUTION:

// 1. We will get the all remaining properties, collect them all up and assign them to the variable called 'rest'.

function Button({ 
    children, 
    ...rest 
    }) {
    return <button {...rest}>{children}</button>;
}

// 2. Now we can add any prop we want to the Button component in the App.js file:

function App() {
    return <div>
        <div>
            <Button onClick={() => console.log('Clicked!')} onMouseOver={() => console.log('Mouse over!')}>Click here!</Button>
        </div>
        <div>
        <Button onMouseLeave={hancleClick}>More info</Button>
        </div>
    </div>
}

// 3. Now we have a small bug in the Button component:

When adding the prop to the Button component in the App.js we will overwrite it by className in the Button component:

function App() {

    return <div>
        <div>
            <Button primary rounded className='mb-5'>
                <GoBell />
                Click!
            </Button>
        </div>
    </div>
}

...and nothing will happen when we click the button.

// 4. We will fix this bug:

function Button({ 
    children, 
    className,
    ...rest 
    }) {
    const classes = twMerge(
        className(rest.className, 'flex items-center px-3 py-1.5 border', {
            'border-blue-500 bg-blue-500 text-white': primary,
        })
    );
    return <button className={className} {...rest}>{children}</button>;
}






 

















