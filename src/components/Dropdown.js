import { useState } from "react";

function Dropdown({ options, selection, onSelect }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        // setIsOpen((currentIsOpen) => !currentIsOpen); // practically it is impossible to click on this item faster than the rendering time
        setIsOpen(!isOpen);
    }


    const handleOptionClick = (option) => {
        // CLOSE DROPDOWN
        setIsOpen(false);
        // DISPLAY WHAT DID THE USER CLICK ON? instead of event object we can pass the option object
        onSelect(option);
    }

    const renderedOptions = options.map((option) => {
        return (
            <div onClick={() => handleOptionClick(option)} key={option.value}>
                {option.label}
            </div>
        )
    });

    let content = 'Select...';
    if (selection) {
        content = selection.label;
    }

    return <div>
        <div onClick={handleClick}>{content}</div>
        {isOpen && <div>{renderedOptions}</div>}
    </div>
}

export default Dropdown;