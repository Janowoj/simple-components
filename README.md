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

// 5. This is very COMMON:

function App() {

    return <div>
        <div>
            <Button
                primary
                rounded
                className='mb-3'>
                <GoBell />
                Click!
            </Button>
        </div>
        <div>
}

# React Components:

// 1. 'Component' - reusable piece of code that shows a handful of elements.
e.g.:
Button, Card, Modal, etc.
// 2. 'Page' - component not inteded to be reused, shows entire page to the user.
e.g.:
CheckoutPage, ProductPage, LoginPage, etc.

# Grouping components by feature (not for beginners):

src/auth/LoginPage.js
src/auth/LoginPage.css
src/auth/LoginForm.js
src/auth/SignupForm.js
src/auth/SignupForm.css

src/cart/CartPage.js
src/cart/CartPage.css
src/cart/CartItem.js
src/cart/CheckoutButton.js
src/cart/CheckoutButton.css

# Grouping components by type (easier for beginners):

src/components/Button.js
src/components/SearcBar.js
src/components/Dropdown.js
src/components/Input.js

src/pages/LoginPage.js
src/pages/CartPage.js
src/pages/CheckoutPage.js

# Grouping components by type and feature (hybrid):

src/components/forms/Input.js
src/components/forms/SearchBar.js
src/components/products/ProductShow.js
src/components/products/ProductList.js

src/pages/LoginPage.js
src/pages/CartPage.js
src/pages/CheckoutPage.js

// Having a bunch of components in the same folder is not a problem.

// Refactoring components:

// 1. We will create a new folder called 'components' in the src folder.
// 2. We will move the Button.js file to the components folder.
// 3. We will create a new folder called 'pages' in the src folder.
// 4. We will change the directory in the App.js file:

import Button from './components/Button' 
(it can be done automatically by the IDE).
// 5. We will create a new folder called 'ButtonPage' in the pages folder.
// 6. We will change the import statement in the ButtonPage.js file:

import Button from '../components/Button'

# App.js is a BACKUP file!
We copied everything from App.js to the ButtonPage.js file.

# Accordion component:

How to create an accordion component?

// 1. We can use hard-coded data in the App.js file.

This is not a good solution, because we will have to change the App.js file every time we want to add a new accordion.

// 2. Create one single accordion component, which we will use multiple times in the App.js file.

Our App component is going to show our instance of the accordion component. When it shows our component it is going to pass down some props, that includes property called 'items' (array of objects).

## Items array:

'Items' is an array of objects, which has some information about section to display.
Names of the properties are not important, but the order is important.
It can be Label or Heading, but it has to be the first property in the object.
The second property can be named Content.

# State design process:

// 1. Designing process takes a good amount of time.

// 2. Here we are going to design process for the accordion component.

// 3. This process works really well when designing more complex components.

## What state and handlers are there?

// 1. List out what a users will do and changes they will see while using your app,
// 2. Categorize each step as 'state' or 'event handler',
// 3. Group common steps. Remove duplicates. 
Rewrrite description of each step.

## What name and type?

// 4. Look at the mockup. Remove or simplify parts that are not changing.
// 5. Replace remaining elements with text descriptions
// 6. Repeat #4 and #5 with a different variations
// 7. Imagine you have to write a function that returns the text of step #5 and #6. In addition to your component props, what other arguments would you need?

## Where is it defined? 

// 8. Decide where each event handler and state will be defined.

### Answers:

I. First Phase:

# 1. User interactions:

// A. Click on a second section label
// B. First section is collapsed
// C. Second section content is shown
// D. Click on a third section label
// E. Second section is collapsed
// F. Third section content is shown

# 2. 

// We need STATE when user sees something on the screen change.
(A AND D)

// We need EVENT HANDLER when user does something.
(B, C, E, F)

# 3. 

// Similar in nature or duplicates:

// We can group A and D together.
// We can group B, C, E and F together.

// Now we can remove duplicates: D, C, E and F.

// We can rewrite the description of each step:

// new A: Clicked on a section header
// new B: One section is expanded, all others are collapsed

II. Second Phase:

# 4. 

// The best type of state is a number, boolean or a string (they are simple, objects and arrays are more complicated).

// This is time to remove parts that are not changing, in this case we can remove the titles and content of the sections.

# 5. 

// Now we replace remaining elements with text descriptions as simple as possible:

// Expanded!
// Collapsed! 

// This is text desrition of what is going on.

# 6. 

// We can repeat #4 and #5 with a different variations:

// Collapsed!
// Collapsed!
// Expanded!

# 7. (MOST CHALLENGING!!!)

// We are going to write a function that returns the text of step #5 and #6.

// In addition to your component props, what other arguments would you need?

e.g.:

const result = myFunction(props, /* ??? */);

console.log(result);

// WE can pass a NUMBER (index of the section) to the function.

e.g.:

function myFunction (items, expandedItems) {
    return items.map((item, index) => {
        if(index === expandedItems) {
            return 'Expanded!';
        } else {
            return 'Collapsed!';
        }
    });
    }

// Now we can call a piece of STATE 'expandedItems'.

# 8. 

// Decide WHERE each event handler and state will be defined.

// In this case we can:

// 1. define the state in the App.js file and pass it down to the Accordion component.

// 2. define the state in the Accordion component.

// Both of them would work 100% fine.

// Better Question: 
Does any component besides Accordion reasonably neeed to know which item is expanded?

// If the answer is 'NO', we can define the state in the Accordion component.
// If the answer is 'YES', we can define the state in the App.js file.

## In our application there is no need to have siblings components, so we can define the state in the Accordion component.

# The handler will be called handleClick. 

// We can define the handler in the Accordion component (it should be usually defined in the same component as state it modifies).

# Conditionally rendering content:
## REACT does not print booleans, nulls and undefineds.

|| gives us the first truthy value.

'hi' || 'there'
'hi'
false || 'there'
'there'
0 || 'there'
'there'
0 || true
true
50 || null
50

&& gives us the first falsy value or the last truthy value.

'hi' && 'there'
'there'
false && 'there'
false
0 && 'there'
0
0 && true
0
50 && null
null

## Accordion component:

const content = isExpanded && <div>{item.content}</div>; 

// If isExpanded is true, we will show the content of the item.

// If isExpanded is false, we will show nothing.

## Changing the value of the state we can see changing the content of the item! (expanding or collapsing the item).

# Event handler:

// This time we will define the handler on the element inside the mapping function.

// When user clicks on the section header e.g. index 0, we will call the handler setExpandedIndex(0).

## Longhand version:

function ProductShow() {
    const handleClick =() => {
        console.log('hi there')
    };

    return <div onClick={handleClick}></div>
}

// It is good to use this version, because we can use the handler in multiple places.
// Also it is easier for developers to read the code.

## Shorthand version:

function ProductShow() {
    return <div onClick= {() => console.log('hi there')} ></div>
    }

// It is also good (though without the name of the handler).

const renderedItems = items.map((item, index) => {
        const isExpanded = index === expandedIndex;



        return (
            <div key={item.id}>
                <div onClick={() => {
                    setExpandedIndex(index);
                }}>{item.label}</div>
                {isExpanded && <div>{item.content}</div>}
            </div>
        )
    });

### We create 3 totally different event handlers above!

## Shorthand version 2.0:

const renderedItems = items.map((item, index) => {
        const isExpanded = index === expandedIndex;

        return (
            <div key={item.id}>
                <div 
                onClick={() => {
                    console.log('hi there');
                    setExpandedIndex(index);
                    }
                    >
                    {item.label}
                    </div>
                {isExpanded && <div>{item.content}</div>}
                }
            </div>
        )
    });

### This is quite good, but harder to read.

# What is a caveat?

// If e have multiple lines of code with more event handlers, this is hard to read.

// If we don't want to clutter our mapping function, we can create eventhandler function outside of the mapping function:

# Icons:

// To render icons from the react-icons library we will declare a variable called icon.
// Inside span element we will use ternary operator to render the icon.

// Import the icon:

import { IconName } from "react-icons/go";

# Tailwind CSS:

// Adding classnames to the different elements.

# Delay State Updates:

// In the console 

<div class = "flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer">

is equal to: &0.

// This is a reference to that element in the DOM.

// We can find the BUG simulating two clicks on the same element (opened section):

$0.click(); // first click
$0.click(); // second click

// After second click we should see section open, but it is closed.

# What is not happening?

// starting with expandedIndex === 0 (first section is opened)

1. User clicks on the first section header (index 0),
2. Event handler is executed
3. Because expandedIndex === index, we call 'setExpandedIndex(-1)';
4. Component rerenders, first section is collapsed
5. User clickes first header again
6. Event handler is executed
7. Because expandedIndex !== index, we call 'setExpandedIndex(0)';

// component rerenders, first section is expanded

# What is actually happening?

// starting with expandedIndex === 0 (first section is opened)

1. User clicks on the first section header (index 0),
2. Event handler is executed
3. Because expandedIndex === index, we call 'setExpandedIndex(-1)';
4. REACT: 'I will update the state later'
5. User clickes first header again (index 0),
6. Event handler is executed
7. expandedIndex has not been yet updated!
8. REACT: 'I will update the state later'

time passes...

9. REACT: 'I will update the state now'
expanndedIndex === -1,
10. Component rerenders, first section is collapsed

# Fixing the bug:

## Option 1: Get React to process the state updates immediately.
## Option 2: Get access to the most up to date value of 'expandedIndex' inside the event handler.

# Option 1 (not recommended):

// Understanding React: React does updates in batches. It allows us to make some updates. REact will process all of them at the same time.

// If we tell React to start processing these updates instantly, our application is going to be a little bit slower.

## Option 2 (recommended): FUNCTIONAL STATE UPDATE:

// React knows,that we are going to need the most up to date value of 'expandedIndex' inside the event handler. Here we need 'expandedIndex' to be -1.

// Simple version:

const handleClick = () => {
        setExpandedIndex(1);
    };

// Functional version:

Use if new value depends on the previous value!!!

const [counter, setCounter] = useState(0);

const handleClick = () => {
    setCounter(currentCounter => {
        if (currentCounter > 1) {
            return 2;
        } else {    
            return currentCounter + 1;
        }
    });
}

// After checking in the console:
$0.click(); // first click
$0.click(); // second click

// We can see that the section is opened after the second click.

# Attention:

 // Technically this is only an issue if state updates really quickly.

 // Practically we can use simple version of the handler.

# Dropdown component:

## Designing props:

// Choose what type of props we want to use as options (string, number, boolean, object, array, function, etc.).

// Good option is to use an ARRAY OF OBJECTS.

// We will use an array of objects with two properties: LABEL and VALUE.

E.G.:

if (selected.value === 'sweet') {
    makeFood();
}

// label is displayed to the user, value is used in the code (has special meaning).

# Creating AccordionPage.js file:

// We will copy everything from App.js to the AccordionPage.js file (remember to change import/export statements).

# Removing the code from the App.js file.

# Creating DropdownPage.js file

# Events and State design process for the Dropdown component:

# 1.
 First Phase: what user will do and what changes they will see:

// User klicks on the dropdown header, what opens the dropdown menu.

// User clicks on the different option, what closes the dropdown menu and shows the selected option.

// so...

1. click the dropdown header
2. list of options is shown
3. click an option
4. list of options is hidden
5. selected option is shown

// that is it!

# 2.
 Categories each step as 'state' or 'event handler':

// We need STATE when user sees something on the screen change.
(2, 4, 5)

// We need EVENT HANDLER when user does something.
(1, 3)

# 3.
 Group common steps. Remove duplicates. Rewrite description of each step:

 // We have two different event handlers.

 Click the cropdown header
 Click an option

 // We can group two state changes together (2 and 4):

 Menu opens and closes

 // We have also standing alone state change (5). 

Item clicked appears in the header

// ==============================

# 4. 

Look at the mockup. Remove or simplify parts that are not changing.

// Removing the content of the sections and arrow icons.

# 5.

Replace remaining elements with text descriptions.

// Menu closed, no option selected
// Menu open, no option selected
// Menu open, option selected

# 6.

Repeat #4 and #5 with a different variations (not needed in this case).

# 7.

Imagine you have to write a function that returns the text of step #5 and #6. In addition to your component props, what other arguments would you need?

//  Focusing on the state changes:

// State nr 1:

e.g.:

const opts = [
    {label: 'The color red', value: 'red'},
    {label: 'The color green', value: 'green'},
    {label: 'A shade of blue', value: 'blue'}
];

const myFunction = (options, isOpen = {
    if(isOpen) {
        return 'Menu open';
    } else {
        return 'Menu closed';
    }
});

myFunction(opts, false); // "Menu closed, no option selected"

myFunction(opts, true); // "Menu open, no option selected"

...so the STATE will be named 'isOpen', TYPE will be boolean. 

// ==============================

// State nr 2:

// We need to know which option is selected.

const opts = [
    {label: 'The color red', value: 'red'},
    {label: 'The color green', value: 'green'},
    {label: 'A shade of blue', value: 'blue'}
];
 const myFunction = (options, selected) => {
    if(!selected) {
        return 'Menu closed, no option selected';
    } else {
        return selected.label;
    }

    return 'Menu open, no option selected';
};

myFunction(opts, null); // "Menu closed, no option selected"

myFunction(opts, opts[0]); // "Menu open, option selected"

...so the STATE will be named 'selected', TYPE will be object or null.

// ==============================

// Handler nr 1 (click an option):

// We need to know which option was clicked.

...so the handler will be named 'handleSelect', TYPE will be function.

// Handler nr 2 (click the dropdown header):

// We need to know if the menu is open or closed.

...so the handler will be named 'handleClick', TYPE will be function.

# 8.

Decide where each event handler and state will be defined.

// Does any other component need to know about the state?

// In some cases some other component besides the dropdown might need to know about the selected piece of state!

...so the state SELECTED we will define in the PARENT component and pass it down to the dropdown component.

...so the state isOpen we will define in the dropdown component (ANY OTHER COMPONENT DON'T CARE ABOUT IT).

# Controlled vs Uncontrolled components:

// Controlled component: a component where the value of an input is controlled by the state of the component.

// Uncontrolled component: a component where the value of an input is controlled by the DOM.

// In the dropdown component we will use the controlled component.

# 1.

Create a new piece of state;

# 2.

Create an event handler to watch for the 'onChange' event;

# 3.

When the 'onChange' event occurs, get the value of the input;

# 4.

Take that value from the input and update the state with it.

# 5.

Pass the value of the state to the input as a value prop.

// WHY do we need to do this?

1. We can manage the text in the input using the state system
2. Need tp know what the search q
3. Need to know what the search query is
4. Input managed in this style are 'controlled inputs'

Managing text input through the state system:


# How to write code below simpler?

let content = 'Select...';
    if (selection) {
        content = selection.label;
    }

// if an array property is set to null or undefined, when typing array.length we will get an error.

...so we can use the fancy syntax:

array?.length

// This is going to check if the array is defined or not.
// If it is not defined, then this entire expression is going evaluate to undefined 
// and NOT going to get an ERROR.

We can use this syntax with boolean:

colors?.length || 100

// On the left side we will receive undefined, on the right side we will receive 100 (FIRST TRUTHY VALUE).

return <div>
        <div onClick={handleClick}>
        {selection?.label || 'Select...'}</div>
        {isOpen && <div>{renderedOptions}</div>}
    </div>


#  Community Convention with Props Names:

// 'Form controls' are components that allow users to enter information, e.g.:
// input, textarea, select, checkbox, radio, dropdown, etc.

// Convention:

// 1. If a component is a form control, it should have a prop called 'value'.
// 2. If a component is a form control, it should have a prop called 'onChange'.

// In this case we have props 'onSelect' and 'selection' passed down to the Dropdown component (child component). 
// We will change the name of the prop 'selection' to 'value'.

# Why do we need to do this?

// It is hard to remember all the different props names for the different components.


# Tailwind CSS for the Dropdown component:

It os OK to have duplicated classNames in the Dropdown component, but we can make it simpler by using new REUSABLE COMPONENT called 'twMerge'.

We created elements which look like PANELS.

It is the the same as in the Button component, but we will use different classNames.

1. Create a new component that shows a handful of JSX elements.
2. Make sure the component accepts + uses the 'children' prop.
3. Allow extra classNames to be passed down + merge to the component (className library).
4. Take extra props and pass them to the root element of the component (all of the additional props and assign them to the div as {...rest}).

# Implementing the Panel component:

// 1. Create a new file called Panel.js in the components folder.

// 2. Creating a functional component:

import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
    const finalClassNames = classNames(
        'p-3 bg-gray-50 border-b',
        className
    );
     return <div {...rest} className={finalClassNames}>{children}</div>
}

classNames is a prop passed down from the parent component (there are many classes in the className).

// 3. Exporting the component:

export default Panel;

// 4. Importing the component in the Dropdown component:

import Panel from './Panel';

// 5. Using the component in the Dropdown component:

In return statement instead <div> we will use <Panel>:

Now we can delete all the classNames from the Dropdown component (leaving only the classNames from the Panel component).

# What is Panel component doing?

Whenever we show Panel component, we create a div with some classNames.  
We can then receive some additional class names and merge them with the classNames we already have.
We can get some children and show them inside the div.
We can take any additional props and pass them to the div.

It makes very little thing, but makes CONSISTENT and REUSABLE STYLING accross our application.

# Duplicating Dropdown component in App.js:

After duplicating the Dropdown component in App.js we can see that both of them are displaying the same value.

They have one piece of state, which is shared between them.

This is not a bug, this is a FEATURE.

But when opening first dropdown, the second one is also opened.

This is a BUG!

We need to add some fumctionality to the Dropdown component to make it work properly.
We have to watch for 'click' event OUTSIDE of the Dropdown component ('isOpen' set to false).

# Watching for 'clicking' on the element outside the component:

// we can do it in plain JS:
1. document-wide click handlers

const handleClick = (event) => {
    console.log(event.target);
};

document.addEventListenet('click', handleClick);

2. event capturing/bubbling

When an event occurs, browser wants to find event handlers to call.

Order in which this seatch occurs is divided into three phases:

I. Capturing phase (browser goes to the most parent of clicked element and goes down to the clicked element):

document.addEventListener('click', handleClick, true);

// usually we don't use this phase

II. Target phase (browser calls the event handler on the clicked element)

III. Bubbling phase (browser goes up to the most parent of clicked element, if there is another event handler, it will be called)

3. checking element inclusion

// we can do it in React:
4. using useEffect hook
5. using useRef hook

# Why we need here Capture Phase handler?

// We need to know if the user clicked on the element outside of the Dropdown component.

const dropdown = document.querySelector('.w-48');

const handleClick = (event) => {
    if (dropdown.contains(event.target)) {
        console.log('click inside');
    } else {
        console.log('click outside');
    }
};

document.addEventListener('click', handleClick, true);

# Why toggling one little argument ('true' to 'false') makes a difference?

// If we change the argument from 'true' to 'false', we will see that when clicking inside the Dropdown component, the console will show 'click outside'.
// this is the same as we would not pass any third argument to the addEventListener() method.

# Expectation when Capture === false (not really):

- User clicks on an option
- No capture phase handlers, so browser goes to the target phase
- Browser sees event handler on the option, so it calls it
- We update state to close the dropdown, but React does not rerender yet... (this is normal React behavior)

...time passes...

- Click event handler we manually added to the document is called
- We check if the click was inside or outside the dropdown

...time passes...

- React finally rerenders the dropdown

// THIS NOT REALLY HAPPENS!!!

# The real process of Capturing the click event (Capture === false):

- User clicks on an option
- Browser starts looking for event handler
- Browser sees click event handler on the 'option' DIV, place by React
- Browser calls the event handler in our component
- We update state to close the dropdown, but React does not rerender yet... (this is normal React behavior)

...time passes...

It just takes longer for manual event handlers to be called.

Couple of milliseconds later finally, when we call the custom event handler, the dropdown is already closed.

When we check to see if the clicked element is inside or outside the dropdown, the clicked element DOESN'T EXIST ANYMORE!

# Why setting third argument to 'true' makes a difference?

By setting third argument to 'true' we are telling the browser to call the event handler during the CAPTURING PHASE.

During the capture phase we are going to first look for the body element and look for click event handlers on there.

So we ABSOLUTELY need 'TRUE' as a third argument, application will not work properly without it.

# Benchmarking:

performance.now()

 window.timeTwo = performance.now();
    const handleOptionClick = (option) => {
        window.timeOne = performance.now();

        // CLOSE DROPDOWN
        setIsOpen(false);
        // DISPLAY WHAT DID THE USER CLICK ON? instead of event object we can pass the option object
        onChange(option);
    }


const dropdown = document.querySelector('.w-48');

const handleClick = (event) => {
    window.timeThree = performance.now();
    if (dropdown.contains(event.target)) {
        console.log('click inside');
    } else {
        console.log('click outside');
    }
};

document.addEventListener('click', handleClick, false);

timeTwo - timeOne
1.600000023841858
timeThree - timeOne
3

// We can see that the timeTwo - timeOne is much shorter than timeThree - timeOne.

// What is why we need to use 'true' as a third argument in the addEventListener() method.

# Using 2 different hooks to get JS working inside our React project.

1. useEffect hook 

// WE are always guaranteed that the useEffect hook is going to run after the first render of our component.

// Depending on what th second argument is, it might run again.

// In this case we are going to use the useEffect hook just ONE TIME.

  useEffect(() => {
        const handler = (event) => {
            console.log(event.target);
        };

        document.addEventListener('click', handler, true);
    }, []);


// Now we get on the console the clicked element, e.g.:
<div class='hover: gb: sky-100 rounded p-1>Green</div>

2. useRef hook

// We need to tell our listener to stop listening for events when the component is removed from the DOM.

// Now our event listener is not going to be cleaned upautomatically.

// Handler function is going to be called every single time when user clicks on the document, event our DROPDOWN component is no longer visible on the screen.

// We can add cleanUp function inside useEffect to remove our component from the screen.
// We don't need to call the cleanUp function, we just return it.

# Element references

// We have to be sure that every single dropdown component has a recerence to the HTML that it created

// That is why we need useRef!

# useRef hook

- it allows a component to get a reference to a DOM element that it creates,

- 95% of the time used with DOM elements, but can hold a reference to any value

# useRef Implementation

1. Create a ref at the top of your component by calling 'useRef'
2. Assign the ref to a JSX element as a prop calld 'ref'
3. Access that DOM element eith 'ref.current'


#  Browser Navigation

In proffessional projects we will use Libraries to handle navigation.

Here we will use the browser navigation made from scratch.

 1. In plain HTML when user types url address and presses enter, browser makes GET request to the server.

 Many servers implement a feature called 'server-side ROUTING'. 
 A rout is a little snippet of code that runs on the server and decides what to send back to the browser.
 It takes a look at the method and the path of the request and decides what to send back.

 2. In this case we are going to assume that we have a server that has a router, that has two routing rules indside of it:
 - request to: myapp.com/ -> send back landingpage.html
 - request to: myapp.com/dasboard -> send back dashboard.html

 3. user can be preserved with some links on the page, e.g.:
    <a href='/dashboard'>Dashboard</a>

    When user clicks on the link, browser makes GET request to the server.

    Server sees the request to the dashboard and sends back dashboard.html (totally different HTML file).

THIS IS VERY IMPORTANT!!!

When the browse loads a new HTML file, it throws away all of the JS VARIABLES AND CODE existing on the page.

e.g.:

// index.html

const myVariable = 10;

user clicks on the link

// dashboard.html

// myVariable is not defined!

# This behavior doesn't really matters for traditional HTML-focused applications.

# This behavior is a problem for React applications.

What will happen if we have a React application and we have a link to the dashboard?

1. User is going to type in our address to the address bar and press enter (browser makes GET request to the server, server sends back index.html). 
2. That HTML file has a script tag that says the browser to load up the bundle.js file (browser makes second GET request to the server, server sends back bundle.js file).
3. Then the React ap would start up and chances are we would have a component that would reach out to the server any fetch some data with dome API endpoint.
4. User makes a third GET request to the server, finally we can see a list of images on the screen.

# If our React app followed traditional navigation ideas, it would take much more requests to show the images on the screen.
# Whereas with traditional HTML-focused applications, we would have to make only one request to the server.

There is alternative to traditional navigation.


# How Navigation works with React?

// Two scenarios:

1. User types our address in the address bar or user id at different page and clicks on the link.
- always send back the index.html file
- the HTML has a script tag inside of it that says the browser to load up the bundle.js file (make the second GET request to the server, server sends back bundle.js file)
our React app starts up
- React applies a series of routing rules to the URL and decides what to show on the screen

If user is trying to go to /images, we will show the component ImageList.

2.  User clicks on the link inside our app or presses the back/forward button.
- stop the browser's default page-switching behavior
- figure out where the user was trying to navigate to
- update the content on the screen o trick the user into thinking they swapped pages
- update address bar to trick the user into thinking they swapped pages

The advantage of this approach is that we don't have to make any additional requests to the server.
If the user wants to go back to the previous page, we can show them the previous page without making any additional requests to the server.

It is important not to define the state inside of the component, because when the component is removed from the screen, the state is going to be lost.

So we should define the state inside of the parent component or a context object.

# new component: SideBar.js

This is navigation bar on the left side of the screen.
Shows links to different pages.

# App.js file:

Shows one of the components: ButtonPage, AccordionPage or DropdownPage (depending on the path).

### Cheking the path:

// We can check the path in the console:

1. Open the consolse in the browser, the Network tab, DOC tab, click on the Name localhost, Response tab, we can see the HTML file.
2. This the same HTML file as in the Public directory index.html file.
3. When typing localhost:3000/something in the address bar, we can see the same HTML file (CreateReactApp IS HANDLING THE ROUTING FOR US!!!).

// How do we look at the path in the React application?

e.g.: 
localhost:3000/dropdown -> path: /dropdown
react-app.org/acccordion -> path: /accordion
react-app.org/images/preview -> path: /images/preview
localhost:3000 -> path: /
localhost:3000/ -> path: /

...so in the console we type:

window.location.pathname

### How can we update the address bar?

Option 1: 

window.location = 'http://localhost:3000/dropdown';

// Causes a full page refresh (we don't want that).

Option 2:

window.history.pushState({}, '', '/dropdown');

// We can see that the address bar is updated, but the page is not refreshed.

// It also makes the back/forward button work.

### How do we detect when the user clicks on the link or presses back/forward button?

1. User clicking on the link:

// Creating a React component called Link.js:

function Link ({to}) {
    const handleClick = (event) => {
        event.preventDefault();
        
console.log('User navigating to:' to);
    };
return <a onClick={handleClick} href={to}>Click me!</a>
}

// When calling event.preventDefault(), we are telling the browser to not do the default behavior.

// Browser will not do a total page refresh.

2. User clicking on a back or forward button:

// Windows emits a 'popstate' event, if current url was added by 'pushState'.

e.g. when typing 
localhost:3000

and then

localhost:3000/accordion,

clicking back and forward we receive totally refreshed page.
This is not what we want!

but...
...when typing in console:

window.history.pushState({}, '', '/a1');
window.history.pushState({}, '', '/a2');

// After going back to the page a1 we don't get a pege refresh.

// After going forward to the page a2 we don't get a pege refresh.

// Only when we go to localhost3000 we get page refresh.

### To detect user clicks forward of backward we use 'popstate'.

window.addEventListener ('popstate', () => console.log('I am at' window.location.pathname));
undefined.

Going back I will see:
console.log "I am at /a1"

Going forward I will see:
console.log " I am at /a2"

# Creating a context

In the src file creating navigation.js.

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    return <NavigationContext.Provider value={{}}>
        {currentPath}
        {children}
    </NavigationContext.Provider>
}

export { NavigationProvider };
export default NavigationContext;

// In App.js the App component wrapped with NavigationProvider

// The only reason we are really updating that piece of state is to cause our component to re-render.

# Programmatic navigation

// Programmatic navigation occurs e.g. on banking software (security sensitive). After log in or authenticate with it, if the user do not interact with the application for some period of time, an applicaion may try to sign out the user automatically.

// This type of application not only sign the user out, but also automatically navigate to some other address.

1. Call 'pushState' to update address bar
2. Update 'currentPath'

// When we do a programmatic navigation, we need to make sure that we update the address
bar and also UPDATE the CURRENT PATH ,which is going to cause our component to re-render.

# Link component implementation:

// The goal of the Link component is to overwrite normal navigation behavior.

// We use this comonent any time a user is trying to go to a path inside of our application.

// If a user is trying to navigate to another website (precisely we watn to show a link that will take user to another website), we don't want to use this component.
// Then we want to use a normal anchor tag.

# Route component implementation:

// If user is at the /dropdown path right now, we want to show whatever is provided as the children prop.

// Props are: 
path: '/dropdown'
children: DropdownPage

In Route:

if (currentPath === path) {
    return children;
}

# Handling Control and Command Keys:

// If user clicks on the link and holds down the control key, we want to open the link in a new tab.

// Open Link component, find an anchor tag and add href prop.

// To check what does it mean add console.log(event) to the handleClick function. Press ctrl and click on the link. Open the console and check the event object. 
There is a property called 'ctrlKey' (true if ctrl key is pressed on Windows).
Therer is a property called 'metaKey' (true if command key is pressed on Mac).

// So if user CLICKS on the link and holds down the CONTROL key, we want to open the link in a new tab (we allow the browser to do the default behavior).

if(event.metaKey || event.ctrlKey) {
    return;
}

# DropdownPage shown in the root route:

http://localhost:3000/

# Styling

// Whenever we show Link component, we are going to allow other developers to give us className props.

// Adding className prop to the Link component in list of classes.

// Adding activeClassName prop to the anchor element in Link component, if particular link to field is equal to the current path stored inside out context object.

# Navigation Libaries:

- React-Router
- Reach-Router
- React-Location
- Wouter

## Modal component:

// Immediate tasks:

1. Create a new component called Modal.js
2. Make a 'ModalPage' component that shows the Modal component
3. Add route to App.js to show the ModalPage component when user navigates to /modal
4. Add a link to the SideBar component to navigate to /modal

## Designing Modal component:

1. Should the button be displayed inside or outside the modal?

// First option: button inside the modal IS NOT GOOD, because we want to open modal WITHOUT a user clicking on the button.

Maybe we want modal to be opened when user has visited the page for e.g. 10 seconds.

// Second option: button outside the modal IS GOOD, because we can open modal WITHOUT a user clicking on the button.

// Parent owns the state to keep track of wheather modal should be displayed or not.

## ModalPage component:

// ModalPage owns the state to keep track of wheather modal should be displayed or not and
// ModalPage has a button, that whenever user clicks on it, we are going to set this piece of state to true and show the modal.

## Displaying THE MODAL:

1. The background of the modal needs to cover the entire screen.

2. The modal needs to cover up all existing content on the screen.

3. The modal needs to be centered on the screen.

// Adding classNames to the Modal component.

function Modal() {
    return <div>
        <div className="absolute inset-0 bg-gray-300 opacity-80"></div>
        <div className='absolute inset-40 p-10 bg-white'>
            I am a modal!
        </div>
    </div>;
}

export default Modal;


// Tailwind ClassName: absolute,
// CSS: position: absolute,
// TailWwind ClassName: inset-0 
// CSS: top: 0, right: 0, bottom: 0, left: 0

// By dafault the position of the element is static.

// Position: absolute puts the element:
- at the top left corner
- of the closest parent element that has a position of relative, absolute or fixed (not static)

// className: inset-0 sets the top, right, bottom and left to 0:
- if the element is positioned absolutely
- the element will expand to fill the entire screen
- on the closest parent element that has a position of relative, absolute or fixed (not static)

// If element has no parent with non-static position, it will be placed at the top left corner of the entire HTML document and it is going to expand to fill up the entire screen.

## Our modal works correctly only because there is no 'positioned' parent element. 

// React project use 'positioned' parent element, so we need to improve our modal.

// That is why we will use Portal.

## Portal

// We put the Modal's HTML down at the bottom of the HTML document, but we can still show it anywhere on the screen.

// It's parent is body element. It will never have positioned parent element!

## Creating Portal component:

// Inside Modal component aw are no longer going to directly return plain JSX elements.

// Instead we are going to return a function call to ReactDOM.createPortal().

// Additionally we can go to index.html  file, create a new div with class name of 'modal-continer' and whatever we put in as a first element it is going to be turned into HTML and placed into that element.

function Modal() {
    return ReactDOM.createPortal(
        <div>
            <div className="absolute inset-0 bg-gray-300 opacity-80"></div>
            <div className='absolute inset-40 p-10 bg-white'>
                I am a modal!</div>
        </div>,
        document.querySelector('.modal-container')
    )
}

export default Modal;

// If we open the console our modal is not being displayed.
// Div class name 'modal-container' is empty...

// ... but after clicking on the button, the modal is rendered and we ee the div class name 'modal-container' is not empty anymore, there is HTML  prodiced by the Modal component.

// now while adding to the ModalPage the className='relative', component Modal is displayed correctly.

## Customizing the Modal component:

// We want to be able to customize the content of the modal using props:
children and action.

## Fixing the bug if paragraph is too long inside the modal:

// We need to make sure that whenever the modal is displayed we somehow PREVENT the user from scrolling the page.

// Whenever the modal is shown we add an additional style to th body element (overflow: hidden), but whenever the modal is hidden we remove that style (overflow: auto).

// We can do it with useEffect hook.

// When our modal is first displayed, we can find the body element and add a style to it. 
when our modal component is about to be removed from the DOM, we can find the body element and remove that style.

useEffect(() => {
    document.body.classList.add('overflow-hidden');

return () => {
        document.body.classList.remove('overflow-hidden');
    }
}, []);

// WE used here a cleanup function, because we want to make sure that we remove the style from the body element whenever the modal is removed from the DOM.

// Removed position absolute from the Modal component and added fixed position.

### Table component:

1. Create a new component called Table.js
2. Make a 'TablePage' component that shows the Table component
3. Add route to App.js to show the TablePage component when user navigates to /table
4. Add a link to the SideBar component to navigate to /table

### Designing Table component:

// We want to be able to show a table with some data inside of it.

// We want to be able to customize the table using props in parent component, e.g. TablePage as array of objects called fruits:

[
    {name: 'apple', color: 'bg-red-300', price: '$1'},
    {name: 'banana', color: 'bg-yellow-300', price: '$2'},
    {name: 'grape', color: 'bg-purple-300', price: '$3'},
]

// We want to pass down the props to the Table component and show the table with the data.

### Table component implementation:

// Inside Table component in the return state we will write a JSX that will show the table with the data.

### Making table component reusable:

// Requirements:

// 1. Variable number of rows
// 2. Variable number of columns
// 3. # (number of) columns doesn't have to match # of properties in object. We want to dictate which properties we want to show in the table.
// 4. Some columns are sortable
// 5. Sortable columns can sort different kinds of values (strings, numbers, dates)
// 6. Cells can be calculated using multiple properties
// 7. Cells can display arbitrary data

### Table component implementation:

// Creating the second array of objects called 'config' with properties.

// Every object that we have inside the config array is going to have a separate column.

// Thewe objects are ging to have several different properties, e.g. label.

// Config array will be placed inside the TablePage component.

// Now we don't need to change the Table component, we can just change the config array in the TablePage component.

// As a property we can add 'render', which is a function that will be called with the current row object and it will return the value that we want to show inside the cell.

#### Sorting the table:

// Planning:

1. understand how the table is supposed to work
- sorting one column means that we are going to change the order of the rows

- there is a cycle of 3 states, when the user clicks: ascending, descending, none

- when the user clicks on e.g. score header one or two time and then clicks on the other header cell, we are going to immediately sort an ascending order on that other column

2. review sorting in JS

// sorting numbers:

const data = [11,1,3,4];

data.sort((a, b) => a - b);

// means: if a < b, return a negative number, if a > b, return a positive number, if a === b, return 0
// second argument of an array is a, first argument of an array is b


data.sort((a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
});

// sorting strings:

const data = ['s', 'A', 'a', 'C', 'c'];

data.sort();

// returns: ['A', 'C', 'a', 'c', 's']

#### localeCompare() is a built-in method on strings, which returns a negative number, a positive number or 0.

const data = ['s', 'A', 'a', 'C', 'c'];

data.sort((a,b) => {
    return a.localeCompare(b);
})

// returns; ['a', 'A', 'c', 'C', 's'];
// WE have to 'tell' the sort function how to sort the strings:

// sorting arrays of objects:

e.g.: 

const data = [
    {weight: 13, cost: 5, name: 'apple'},
    {weight: 11, cost: 3, name: 'banana'},
    {weight: 12, cost: 4, name: 'grape'},
]

- sorting based upon the name property (alphabetical order),
- sorting based upon the cost property (ascending or descending order),
- sorting based upon the weight property (ascending or descending order)

or...
- sorting based upon the cost per pound (cost divided by weight ratio)
- sorting based on other properties (e.g. length of the 'name')

// To do this we need some transformation step.

3. look at options for adding sort to the table
4. remember, the Table component is supposed to be REUSABLE!

#### Reversing sort order:

// We can easily swap our order by:
MULTIPLYING THE RESULT BY -1.

function getSortValue(vegetable) {
    return vegetable.cost
}

data2.sort((a, b) => {
    const valueA = getSortValue(a);
    const valueB = getSortValue(b);
    if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
    } else {
        return (valueA - valueB) * -1;
    }
});

// This is not the best idea, because we need type * -1 each time we want to reverse the order.

#### Code in Table Component:

// current:

- Rendering Header Cells,
- Rendering Rows,
- Assemble and return the Table,

// in the future we want to have a reusable Table component.

// We might have some Table that probable shouldn't be sortable (e.g. Top 3 movies) and another Table that should be sortable (All movies). 

// Table component with sorting functionality:

- State to traack the sorting stuff,
- Function to handle click on a Header,
- Rendering Header + sort direction icons,
- Sorting Logic,
- Rendering Rows,
- Assemble and return the Table,

// This is not the best idea because of a lot of logic inside the Table component.

#### Table Compontent Refactoring:

// We want something other than a plain th element to be rendered inside of the header cell.

// Object in Config:

header: optional function to decide what to show here
label: what to show in the header cell
render: optional function to decide what to show inside the cell

{
            label: 'Score squared',
            render: (fruit) => fruit.score ** 2,
            header: () => <className='bg-red-500'>Score</th>
        }

// We can now customize the header cells.

#### Warning missing key prop:

// We don't want to add any props to the TablePage component, because we want it to be used by other developers:

header: () => <th key='asdf' className='bg-red-500'>Score</th>

// Another solution is to add a key prop to the div element:

if (column.header) {
            return <div key={column.label}>{column.header()}</div>;
        }

// Now there is another error! WE CANNOT DISPLAY DIV element INSIDE a TH element!

// Inside the Table component:

function Echo({ children }) {
    return children;
}

#### What does Echo component do?

// It takes a prop called children and returns it.
// We can asign a key prop to the Echo component, but it doesn't actually produce any HTML.

#### Instead of Echo component we can use React.Fragment (built-in component):

if (column.header) {
            return <React.Fragment key={column.label}>{column.header()}</React.Fragment>;
        }

#### sortValue function:

// optional function to describe how to extract the values for sorting when this column is clicked

#### SortableTable component:

// This component is going to modify some props that are going down to the Table component and add a click event handler to the header cells.

- Look at each object in the config array,
- does the object have a sortValue function?
- if so, this column must be sortable
- add a 'header' property that will store a clickable header cell
- when user clicks this, sort the data and pass the sorted
dData down to the table

// It ADDS in some ADDITIONAL FUNCTIONALITY to the TABLE component.

#### Adding SortableTable component:

1. Create SortableTable.js component. For now, take all props and pass them through to Table.
2. Make sure TablePage shows SortableTable
3. Add 'sortValue' functions to column config in TablePage. 
Remove 'header' properties.
4. SortableTable should find column objects with sortValue functions and add a header function to them.
5. TH returned by the 'header' function should watch for click events.
6. When the user clicks the TH, SortableTable should sort the data and pass the sorted data down to Table. sort data and pass the result to Table.

#### State design for SortableTable:

// option 1:

// State is the sorted version of 'data'.
// When user clicks a header, re-sort data, pass it into Table.

// THIS IS NOT A GOOD IDEA.
// We need to have something inside of our component that keeps track of what the current order is!
// Also whenever the user clicks on these headers, we want to modify these little icons.

// option 2:

// We create two pieces of state:

- one to keep track of the current order (null, 'asc', 'desc'),
- second to keep track of which column is currently being sorted (null, 'Name', 'Score')

#### Icon sorting setup:

// We need to add some icons to the header cells.

// To keep the file clean, we are going to create a seperate function called getIcons(column.label, sortBy, sortOrder).

// If those two first parameters right there are not equal, it means that we know wa want to show both icons (up and down), because we are not currently sorting by this column.

// If column.label === sortBy, it means that we are currently sorting by this column and we have to look at the sortOrder to decide which icon to show.

#### Sorting order reset:

// We are always going through that SAME cycle from UNSORTED to ASCENDING to DESCENDING to UNSORTED regardless of which header cell we are sorting by.

// We would like to be able to click on the different header cell and sort on that column in ascending order.

#### Different UI for presenting the data:

// Same DATA prop, same sortOrder and sortBy states, but different UI.

// How we can we extract the sorting logic and reuse it in different locations of our project? 

// We can create a CUSTOM HOOK.

##### Custom Hooks:

// Functions that contain some reusable logic inside of them.

// Custom hooks ussually reuse bulit-in hooks like useState, useEffect, useRef.

// Usually easiest to extract logic into a hook, rather than making a hook first.

##### Our plan:

1. Make a tuny demo component with a tiny bit of logic inside of it.

2. Learn a design process to extract that logic into a custom hook.

3. Go back to SortableTAble and repeat the design process.

##### CounterPage component:

- counter state
- useEffect to update document title
- handleClick function to increment counter
- JSX to show counter

// In the first three parts of code we have some logic that we want to extract into a custom hook.

##### Custom hooks strategy:

1. Find code in a component related to a single piece of state.
2. Copy and paste it into a helper function.
3. Fix all the brokev references.
4. HURRA! You have a CUSTOM HOOK!

##### Custom hook implementation:

// Take count, useEffect and handleClick function and put them into a function called useCounter.

// We can use this hook in any component we want.

##### Hook Creation:

1. Make a function called 'useSomething'
2. Find all the non-JSX expressions that refer to 1-2 related pieces of state
3. Cut them all out, paste them into 'useSomething'
4. Find 'not defined' errors in your component
5. In the hook, return an object that contains the variables the component needs
6. In the component, call your hook. Destructure the properties the component needs.
7. Find 'not defined' errors in your hook. Pass the missing variables in as rguments to the hook.
8. Rename the variables in the component to match the names in the hook.
9. REname returned properties to something more descriptive.

##### SortableTable sections:

sortOrder state,
sortBy state,
handleClick function,
updatedConfig array,
sorting logic,
JSX

##### SortableTable refactoring:

// We can extract the sorting logic into a custom hook for sorting any kind of data, e.g. list.

useSort:

sortOrder state,
sortBy state,
handleClick function,
sorting logic

###### useReducer hook:

// useReducer uses some pattern very often used in React applications, especially in the Redux library.

// We can use useReducer hook to simplify the code.

// To understand Redux we need to understand useReducer.

###### Our plan with useReducer:

// Refactor the simple CounterPage to use useState without any custom hooks.

// Refactor the simple CounterPage to use useReducer.

// useReducer is a different way of handling state inside of a component.

###### useState vs useReducer:

// useState is absolutely fine hook to use whenever a component needs state.

// useReducer:
- is a different way of handling state inside of a component
- produces the state
- changing this state makes component rerender
- useful when you have several different CLOSELY-RELATED pieces of state (e.g. valueToAdd and count)
- useful when FUTURE state values depend on the current state (e.g. incrementing a counter)

###### Conventions of useState and useReducer:

// useState:
count, setCount (state - number)
valueToAdd, setValueToAdd (state - number)

Each piece of state defines as a SEPARETE VARIABLE.

// useReducer:

{
    count: 10,
    valueToAdd: 20
}
(state - object)

// All state for the whole component defined in a SINGLE OBJECT.

// If we want to figure out what a current state is, we can use simply console.log(state).

##### State Updates with useReducer:

// When You call DISPATCH, react is going to find that REDUCER function that e defined at the top of the file and passed as the first argument to useReducer.

// The current STATE of component is a first argument to the reducer function. The STATE is always an object.

// The second argument to the reducer function is the ACTION object (the name is a convention).

- The value of the ACTION object is going to be whatever we pass into the DISPATCH function (no argument or one).

- whatever we return from the reducer function is going to be the NEW STATE of the component.

- then the component is going to rerender.

##### Rules around Reducer Functions

- Whatever you return from the reducer function is going to be the NEW STATE of the component.

- If you return nothing, then your state will be undefined.

- No async/await, no requests, no promises, no outside variables.

##### Like almost anywhere else in React, don't directly modify the state object!

// We can use the spread operator to copy the state object and then modify the copy.

// BAD: 

const reducer = (state, action) => {
    state.count = state.count + 1;
    return state;
}

// GOOD (overwriting the count property):

const reducer = (state, action) => {
    return {
        ...state,
        count: state.count + 1
    }
}
// GOOD (overwriting the valueToAdd property):

const reducer = (state, action) => {
    return {
        ...state,
        count: state.valueToAdd + 1
    }
}

// GOOD (complete reset the state object):

const reducer = (state, action) => {
    return {
        count: 0,
        valueToAdd: 0
    }
}

###### useReducer problem:

// When the reducer function runs, we are executing some code inside of it, but we DON'T KNOW WHAT STATE IS SUPPOSED TO BE UPDATED.

// So we have to tell the reducer function what state is supposed to be updated.

// SOLUTION:

// When we call 'dispatch', we need to pass along some info to tell the reducer how the state should be updated.

// Many ways to do this!

// The React community has come up with a convention on how to tell the reducer what it needs to do:

// Convention: ACTION OBJECT

const increment = () => {
    dispatch({
        type: 'increment-count'
    });
};

1. When we need to modify the state, we will call dispatch and always pass in an 'action' object.

2. The 'action' object will always have a 'type' property that is a string.
This helps tell the reducer what state update it needs to make.

3. If we need to communicate some data to the reducer, it will be placed on the 'payload' property of the 'action' object.

const handleChange = (event) => {
    const value = event.target.value;

    dispatch({
        type: 'set-value-to-add',
        payload: event.target.value
    });
};

THIS IS A COMMON COMMUNITY CONVENTION, NOT A REQUIREMENT!

// What is going to be in the reducer function?

const reducer = (state, action) => {
    if(action.type === 'increment-count') {
        return {
            ...state,
            count: state.count + 1
        };
    }

    if(action.type === 'change-value') {
        return {
            ...state,
            valueToAdd: action.payload
        };
    }

##### Constant action types:

// The string in the action object is called 'action type' and should be the same as the string in the reducer function (take care of typos).

// We can use CONSTANT VARIABLES to avoid typos on the top of the file or in a separate file.

// The community convention is to use all CAPITAL LETTERS for the constant variable (just for another developer to know that this is a constant variable).

##### Refactioring to a switch statement:

// This is very common in Redux applications.

const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT_COUNT:
            return {
                ...state,
                count: state.count + 1,
            };
        case SET_VALUE_TO_ADD:
            return {
                ...state,
                valueToAdd: action.payload,
            }
        default:
            return state;
        // throw new Error(`Unknown action type: ${action.type}`);

    }
};

    return state;
}

##### Updating the state using switch statement:

1. Add a new constant action type string,
2. Add a call to 'dispatch' with the new action type,
3. Add a new case statement in your reducer function,

##### Practiocal tips for useReducer:
// Usually makes more sense to stuff logic into the reducer and keep the dispatch calls simple

// Less duplicated code if you need to dispatch the same action in multiple places

// Part of the goal of reducers is to have a very specific set of ways that sstate can be charged 

##### IMMER library:

// Immer is a library that makes it easier to update state inside of a reducer function.

// We can directly modify the state object inside of the reducer function.

// Not all React projects that you work on are going to use Immer (we need to know how to update state without Immer).

// using Immer:

1. You can mutate the state directly,
2. Do not have to return a new value,
3. Still return in each case, otherwise you get 'fall-through' errors

e.g.:
const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT_COUNT:
            state.count++;
            return;
        case SET_VALUE_TO_ADD:
            state.valueToAdd = action.payload;
            return;
        default:
            return state;
    }
};

# React-Redux introduction:

// React-Redux is a library that helps us to manage state inside of our application. It is very similar to the useReducer hook.

// similarites:

// With Redux we still have action objects, dispatch function and reducer function and we still creating a state object, that is going to be used by our application.

// differences:

1. With useReducer all of our state was created and maintained in the React world.

// With Redux we create a separate state object called the REDUX STORE, that is maintained by Redux.

// To create connection between React and Redux we use a library called React-Redux Provider.

// This is how the Redux data is being shared with React side of our application: it is using CONTEXT under the hood.

2. With useReducer we make noe single reducer function that handles all of our state updates.

// In the world of Redux we make many different reducer functions, each of which is responsible for updating a single piece of state.

// Each different reducer function is going to be in charge of magaging a single piece of state, e.g. 
reducer to manage a list of users, 
reducer to manage a list of videos, 
reducer to manage a list of images.

// If we have one reducer function it is a sign, that our application might not be at the size that we need to have Redux.

3. State objects are a little bit more complicated in Redux.
e.g.:

{
    users: {
        currentUser: {
            id: 1,
            name: 'Sam',
            age: 30
        }
    },
    videos: {
            playlist: [
                {
                    title: 'Surfing in Hawaii',
                }
            ]
        },
    messages: {
            unread: [
                {constent: "Msg me"}
            ]
        }
    }

// We do this to split up the responsibility of managing state inside of our application.

# Redux vs Redux-Toolkit:

// Redux-Toolkit is a library that makes it easier to work with Redux.

// The main reason to use Redux boils down to dispatch function.

// If we want to change state in any way we must call dispatch function! (there some advantages and disadvantages of this).

// It turns out that KEEPING TRACK of all these updates we need to make in the large application is very DIFFICULT and confusing.

// ADVANTAGES OF REDUX:

// The central point of changing the state is THE DISPATCH FUNCTION. This makes it easier to engineers to understand how the state is being changed.

// Having DISPATCH FUNCTION it becomes easy to add in additional debugging tools.

// DOWNSIDES OF REDUX:

// We need to write many extra code inside the reducer functions (a lot of BOILEPLATE CODE).

...SO...

// Redux-Toolkit is a library that makes it easier to work with Redux (RTK).

// This is a wrapper around Redux.

1. It creates our different action types of reducer functions for us. Techincally we are still making use of Redux.

2. Making use of Redux-Toolkit is a recommended way of creating Redux projects in the future.

# Redux Store:

1. Redux store is a single object that contains all of the state data for our application.

// Usually n application has a single Redux store.

// We usually do not have to interact with it directly ( the React-Redux library is going to do that for us).

// Whenever we want to interact with the store maually (for debugging purposes and whatnot ), there are two common things we will do:

1. We often manually dispatch actions to the store by calling store.dispatch({type: 'songs/addSongs'}).  

2. Sometimes we might want to see what state exists inside the store by calling store.getState().

// Both of these are not very common, we rather use React-Redux library.

e.g.:

{
    movies: ['Interstellar', 'Inception'],
    songs: ['Hello', 'Someone like you'],
}

2. Each of these different arrays is going to be managed by a separate reducer function that we create.

3. Whenever we want to add a song, remove a song, add a movie, remove a movie, we are going to dispatch an action object from the handler function into our reducer functions. 

4. This way we will change the state inside of the Redux store.

# Redux-Toolkit implementation:

import { configureStore, createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      //
    }
  }
});

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer
  }
});

console.log(store);

const startingState = store.getState();
console.log(JSON.stringify(startingState));

store.dispatch({
  type: "song/addSong",
  payload: "New Song!!!"
});

const finalState = store.getState();
console.log(JSON.stringify(finalState));

// in the console we can see the state of the store before and after dispatching the action:

{"songs":[]} 
{"songs":["New Song!!!"]} 

# State in Redux:

{
    currentUser: [{id: 1}],
    videos: {viewedIds: [4,6,1]},
    messages: {unreadCount: 90},
    notifications: {urgent: 'Read This!'}
}

1. Keys for this big object are set when the store is created.
2. Values for these keys are set by the reducer functions.
3. Keys stay the same, but values change over time as our state changes.
4. Rememeber, it is usually nice to store all state in a single big object.

# Reducers in our Redux store:

{
    songs: []
}  

// This state is produced by songs 
reducer function to maintain that array.

// The key (name) is created when we create the store.

const store = configureStore({
  reducer: {
    songs: songsSlice.reducer
  }
});

// Songs property means that the object is going to have a key of songs.

# Slices in Redux:

// A slice is a collection of reducer logic and actions 

// Slice is not changing the underlying state updating flow, it is just a way of organizing the code.

// Slice:

I. Defines some initial state
II. Combines 'mini' reducer functions into a single, big  reducer function

// useReducer:
// to call ONE single DISPATCH we need to reducer, switch statement and constant action types (a lot of boilerplate code).

// Redux-Toolkit:
// Slices are what save us from having to write out all this boilerplate code.

// Whenever we define a SLICE, we write out a set of MINI-REDUCER FUNCTIONS on that REDUCER PROPERTY.

// Each function in reducer object is like an individual case statement in a switch statement. 

// REDUCER PROPERTY is like MEGA-REDUCER FUNCTION. 

// It combines all of these mini reducer functions into a single, big reducer function. This combined reducer is what actually gets loaded into the Redux store.

// One of the proprty on the slice object is called 'reducer' (not reducers). This is a single function that is going to be called whenever we dispatch an action to the store.

// Inside of each different reducer function we can modify the state object in any way we want.

// We can use the 'immer' library to directly modify the state object.

// How do we know which reducer function to call?
We use PATTERNS to figure out which reducer function to call:

1. Slice is going to take the NAME of the SLICE (e.g. 'song'), ADD a SLASH and then ADD the NAME of the REDUCER FUNCTION (e.g. 'addSong').
 
We will end up with a string that looks like this: 'song/addSong'.

2. If there ise an action dispatched with this type, then the songSlice (big reducer function) is going to call the addSong reducer function.

// That state argument inside addSong reducer function is only the piece of state that is being managed by the songSlice reducer function.

// STATE IS NOT THE BIG STATE OBJECT IN THE STORE, IT IS
// THE PIECE OF STATE MANAGED BY THIS REDUCER

III. Creates a set of action creators and action types that correspond to the reducers and state

// Tools that are going to help us create these action types automatically and keep us from having to memorize this pattern are called 'ACTION CREATORS'.

ACTION CREATORS:

// Set of functions created for us automatically by the slice.

// When called they return an action that we can dispatch to the store.

// Seve use from having to manually create action objects.

# Connecting React and Redux:

// We need to use the React-Redux library to connect React and Redux.

// The KEY PART of React-Redux is the Provider component.

1. When we create this Provider, we pass in our Redux store as a prop to it.

2. Then through the Context system, the store and specifically the dispatch function and the state within it are going to be made available to all of the different components inside of our application.

3. We don't have to mwke directly use of the context system, instead we are going to use some different HOOKS
to access dispatch and our state.

# Connecting React and Redux implementation:

1. Export the 'store' from whatever file we create it in.
2. Import the store to the index.js file.
3. Import the Provider component from React-Redux library.
4. Wrap the App component with the Provider component and pass in the store as a prop.

# Changing the state in Redux:

1. Add a reducer to one of your slices that changes state in some particular way.

reducers: {
    addSong(state, action) {
        state.push(action.payload);
        },
    removeSong(state, action) {
      // action.payload === string, the song we want to remove
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
        }
    }
2. Export the action creator that the slice automatically creates for you.

export const { addSong, removeSong } = songsSlice.actions;

3. Find the component that you want to dispatch from.

const handleSongAdd = (song) => {
    console.log(song);
}

4. Import the action creator function and useDispatch hook from React-Redux.

import { useDispatch } from "react-redux";
import { createRandomSong } from "../data";
import { addSong, removeSong } from "../store";


5. Call the 'useDispatch' hook to get access to the dispatch function.

function SongPlaylist() {
  const dispatch = useDispatch();
}

6. When the user does something, call the action creator to get an action, then dispatch it.

const handleSongAdd = (song) => {
    const action = addSong(song);
    console.log(action);
}

# Accessing state in Redux (many times per project):

1. Find the component that needs to access state.

import {useDispatch, useSelector} from 'react-redux';

2. Import the 'useSelector' hook from React-Redux.

function SongPlaylist() {
    const dispatch = useDispatch();
    const songPlayList = useSelector((state) => state.songs);
}

3. Call the hook, passing in a selector function

// Confusing thing is:

// Reducers in a slice only'see' their own part of the overall state object.

...so...

// In a reducer function, the 'state' argument is only the piece of state that is being managed by that reducer.
// Everywhere else, 'state' means the whole state object.

4. Use the state! Anytime the state changes, the component will automatically rerender.

# Resettting the state in Redux:

// What to do when we are trying to update two different pieces of state at the same time (e.g. managed by songSlice and movieSlice)?

// First we want to clean out the list of movies.

// IMMER UNDERSTANDS THIS:

reset(state, action) {
      state.playlist =  [];
    }

// DON'T DO THIS:

reset(state, action) {
      state = [];
    }

// This is not going to work, because we are not actually modifying the state object (IMMER doesn't know that we are trying to modify the state object).

// DO THIS:

reset(state, action) {
      return [];
    }

export const { addMovie, removeMovie, reset } = moviesSlice.actions;

// In the App component:

import { useDispatch } from "react-redux";
import { reset } from "./store";

# Multiple state updates in Redux:

// We have four different ways to make sure that with ONE SINGLE CLICK we can update MULTIPLE PIECES OF STATE.

1. Have the movieSlice's 'reset' function update the list of songs. (this CAN'T BE DONE,because the reset function only has access to the movieSlice's piece of state).

reset(state, action) {
      state.songs = [];
      return [];
    }

2. Dispatch to separate actions (OK, but we have to dispatch actions to many times).

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      // action.payload === string, the song we want to remove
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
    resetSong (state, action) {
      return [];
    }
  }
});

3. Get the songsSlice to watch for the 'reset' action.

// Whenever we call dispatch and we dispatch an action, that action object is sent to every reducer in the store, every Combined Reducer Function (not mini reducer functions).

// To check what is dispatched when the click on the reset button:

 resetMovie(state, action) {
      console.log(action);
      return [];
    }

// ... we receive in the console: 
{type: "movies/reset", payload: undefined}

// Whenever the slice is created by Redux Toolkit, extraReducers property is going to be called automatically and the builder object is going to be passed in.

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      // action.payload === string, the song we want to remove
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    }
  },
  extraReducers(builder) {
    builder.addCase("movie/reset", (state, action) => {
      return [];
    });
  }
});

// It is a good practice not to use string in the addCase method, but to use the action creator function (to avoid typos).

// When typing:
console.log(moviesSlice.actions.reset.toString());

... we receive in the console:
"movies/reset"

.. so we can use it in the addCase method:

extraReducers(builder) {
    builder.addCase(moviesSlice.actions.reset, (state, action) => {
      return [];
    });
  }

// we don't have to use toString() method, because the addCase method is going to convert the action creator function to a string automatically.

4. Create a new, standalone reset action and get both slices to watch for it (the BEST SOLUTION).

// Solution 3 is not ideal because if we will change something in the moviesSlice (e.g. rename a reducer or reset) all of the sudden our songSlice is going to BREAK.

// goal:

Get both the Combined Songs Reducer and the Combined Movies Reducer to watch for an action of 'app/reset'.

// steps:

- delete the reset function from the moviesSlice (reducer),
- remove the builder.addCase method from the moviesSlice,
- remove the reset from the export statement,

- import {createAction} from '@reduxjs/toolkit',
- const reset = createAction('app/reset'),
- add to both slices: 

extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }

  # File and Folder Structure:

// organize by 'function':

- components/
- store/
    - slices/
    - index.js
    - actions
        - actions.js
  - reducers.js
- App.js
- index.js 

// oranize by 'feature':

- src/
    - movies/
        - MovieList.js
        - moviesSlice.js
    - songs/
        - SongList.js
        - songsSlice.js
    - store/
        - index.js
        - actions.js
        - reducers.js
    - App.js
    - index.js

// Redux docs reccoment to organize by 'feature'.

// Redux Toolkit docs don't  make a direct recommendation.

// 'Feature' approach frequently does not work well with Redux Toolkit (CIRCULAR IMPORTS).

// 'Function' approach is more common with Redux Toolkit.

// Allowing components to import from slice files gets really messy.

... so 

// Inside index.js file we can create and export Redux store, which we then will use inside the ROOT index.js inside the src folder.

// In addition to making the store and exportinh it, the index.js file is also going to import Action Creator functions and immediately RE-EXPORT them.


