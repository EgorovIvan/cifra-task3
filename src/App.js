import './App.css';
import "./less/style.less";
import CardList from "./components/CardList";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const [appState, setAppState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleScroll = () => {
        if ((app.scrollHeight - app.scrollTop) === app.clientHeight) {

            /* Добавление карточек героев */
            setCurrentPage(currentPage + 1)

            /* Удаление карточек героев */
            if (cards.childElementCount >= 40) {

                setAppState(prevState => (
                    prevState.filter((item, index) => index > 20)))
                // setAppState(prevState => {
                //     const newArray = [...prevState];
                //     newArray.splice(0, 20);
                //     return newArray;
                // })

            }
        }
    }


    useEffect(() => {
        const apiUrl = 'https://rickandmortyapi.com/api/character/';

        axios.get(apiUrl, {
            params: {
                page: currentPage
            }
        }).then((resp) => {
            const allHeroes = resp.data;
            appState.length < 1 ? setAppState(allHeroes.results) : setAppState(() => [...appState, ...allHeroes.results]);
        });

    }, [setAppState, setCurrentPage, currentPage]);

    return (
        <div className="App" id="app" onScroll={handleScroll}>
            <header className="header">
                <h1 className="header__title">The Rick and Morty API</h1>
                <div className="header__link" id="favorites-btn">Избранное</div>
            </header>
            <main className="main">
                <div className="container">
                    <div className="main__cards" id="cards">
                        {appState ? <CardList appState={appState}/> : ''}

                    </div>
                </div>
            </main>

        </div>
    );
}

export default App;
