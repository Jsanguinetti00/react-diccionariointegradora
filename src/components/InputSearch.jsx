import React, {useState} from 'react'
import PropTypes from 'prop-types'
import '../components/styles/InputSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
const InputSearch = ({placeholder, onSearch, hasResetButton = false}) => {
    const [value, setValue] = useState();

    const handleOnClick = (e) => {
        onSearch(value);
    }

    const handleOnKeyPress = (e) => {
        if(e.key === "Enter"){
            onSearch(value);
        }
    }

    const resetSearchField = (e) => {
        setValue("");
        onSearch("");
    }
    return (
        <div className="search_container">
            <div className="container__input">
                <input type="text" 
                    placeholder={placeholder} 
                    className="input" 
                    onChange={(e) => setValue(e.target.value)} 
                    onKeyPress={handleOnKeyPress}
                    value={value}/>
                <button className="button" onClick={handleOnClick}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            {
                hasResetButton ?
                <Button text="Reset" onClick={ resetSearchField }/>
                :
                ''
            }
        </div>
    )
}

InputSearch.propTypes = {
    placeholder : PropTypes.string,
    onSearch : PropTypes.func.isRequired,
    hasResetButton: PropTypes.bool
}

export default InputSearch
