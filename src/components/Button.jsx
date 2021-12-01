import React from 'react'
import '../components/styles/Button.css'

const Button = (props) => {
    return (
        <>
            <button className="styleButton shadow" {...props}>
                { props.text }
            </button>
        </>
    )
}

export default Button
