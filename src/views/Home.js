import React from 'react'
import '../components/styles/Home.css';
const Home = () => {
    return (
        <div className="containerHome">
            <div class="inicio__container-cards">
                <div>
                    <h1 class="inicio__h1">Bienvenido al diccionario online, aqui podrá consultar significados de palabras tanto en inglés como en español</h1><br/>
                    <h4 class="inicio__h4">Disfruta tu instancia</h4>
                </div>
                <img src="https://ethereum.org/static/5dea0acbc8484c42006d7bbed32fa019/dd5bb/doge-computer.png" alt="" class="inicio__img"/>
            </div>
        </div>
    );
};

export default Home;
