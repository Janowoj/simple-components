import { useState } from "react";

function Dropdown({ options }) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        // setIsOpen((currentIsOpen) => !currentIsOpen); // practically it is impossible to click on this item faster than the rendering time
        setIsOpen(!isOpen);
    }

    const renderedOptions = options.map((option) => {
        return <div key={option.value}>{option.label}</div>
    });

    return <div>
        <div onClick={handleClick}>Select...</div>
        {isOpen && <div>{renderedOptions}</div>}
    </div>
}

export default Dropdown;