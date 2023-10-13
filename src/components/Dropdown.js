import { useState } from "react";

function Dropdown({ options }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        // setIsOpen((currentIsOpen) => !currentIsOpen); // practically it is impossible to click on this item faster than the rendering time
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) => {
        // CLOSE DROPDOWN
        setIsOpen(false);
        // DISPLAY WHAT DID THE USER CLICK ON? instead of event object we can pass the option object
        console.log(option)
    }

    const renderedOptions = options.map((option) => {
        return <div onClick={() => handleOptionClick(option)} key={option.value}>{option.label}</div>
    });

    return <div>
        <div onClick={handleClick}>Select...</div>
        {isOpen && <div>{renderedOptions}</div>}
    </div>
}

export default Dropdown;