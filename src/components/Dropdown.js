import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

function Dropdown({ options, value, onChange }) {

    const [isOpen, setIsOpen] = useState(false);
    const divElement = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divElement.current) return;

            if (!divElement.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        }
    }, []);

    const handleClick = () => {
        // setIsOpen((currentIsOpen) => !currentIsOpen); // practically it is impossible to click on this item faster than the rendering time
        // Functional State Updates
        setIsOpen(!isOpen);
    }

    // window.timeTwo = performance.now();
    const handleOptionClick = (option) => {
        window.timeOne = performance.now();

        // CLOSE DROPDOWN
        setIsOpen(false);
        // DISPLAY WHAT DID THE USER CLICK ON? instead of event object we can pass the option object
        onChange(option);
    }

    const renderedOptions = options.map((option) => {
        return (
            <div 
            className="hover:bg-sky-100 rounded cursor-pointer p-1" 
            onClick={() => handleOptionClick(option)} 
            key={option.value}>
                {option.label}
            </div>
        )
    });

    return (
        <div ref={divElement} className="w-48 relative">
            <Panel
                className="flex justify-between items-center cursor-pointer"
                onClick={handleClick}
            >
                {value?.label || 'Select...'}
                <GoChevronDown className="text-lg" />
            </Panel>
            {isOpen && (
                <Panel className="absolute top-full">
                    {renderedOptions}
                </Panel>
            )}
        </div>
    );
}

export default Dropdown;