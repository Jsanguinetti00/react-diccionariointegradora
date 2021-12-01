import React from 'react'
import { useState } from 'react/cjs/react.development';
import '../components/styles/Dropdown.css'
const Dropdown = ({ items, label = "Select an option", onSelected }) => {

    const [openMenu, setOpenMenu] = useState(false);

    const handleOnClick = (item) => {
        onSelected(item.value);
        setButtonText(item.label);
        setOpenMenu(!openMenu);
    }

    const [buttonText, setButtonText] = useState(label);

    return (
        <>
            <div className="dropdowncls">
                <button className="dropbtn" onClick={() => setOpenMenu(!openMenu)}>{buttonText}</button>
                
                    <div className={'dropdown-content ' + (openMenu === true ? 'active' : '')} >
                        <ul>
                            {items.map((option) => {
                                
                                return <li key={option.value} value={option.value} onClick={() => handleOnClick(option)}>{option.label}</li>
                                })
                            }
                        </ul>
                    </div>
            </div>
            
        </>
    )
}

export default Dropdown