import { useState } from "react";
import InputSearch from '../components/InputSearch';
import CardInfo from "../components/Card";
import Dropdown from '../components/Dropdown';
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

const Diccionario = () => {
    const [results, setResults] = useState([]);
  const [language, setLanguage] = useState('es');

  const languages = [
    {
      value: 'es',
      label: 'Español'
    },
    {
      value : 'en',
      label : 'English'
    }
  ]

  const handleSearchValue = (value) => {
    if(value !== ""){
      axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${value}`)
      .then( response => {
        console.log(response.data);

        setResults(response.data);
      }).catch( err => {
        alertify.error(`TITLE ${err.response.data.title} \nMESSAGE: ${err.response.data.message}`);
      });
    }else{
      alertify.warning("Debes llenar el campo de busqueda");
      setResults([]);
    }
    
  }

  const handleOnLanguageSelect = (value) => {
    setLanguage(value);
  }
  
  return (
    <div className="App">

      <div className="header-container">
        <Dropdown items={ languages } onSelected={ handleOnLanguageSelect } label="Language"/>
        <InputSearch onSearch={ handleSearchValue } placeholder="Search any word" hasResetButton={true} />
      </div>

      

      <center>
        <h2>Resultados</h2>
        {
          results !== undefined || results.length > 0 
          ?
          results.map( (item, index) => {
            return <CardInfo key={index} word={ item.word } meanings={ item.meanings[0].definitions } />
          } )
          :
          'No hay elementos'
        }
      </center>
    </div>
   
  );
}

export default Diccionario;
