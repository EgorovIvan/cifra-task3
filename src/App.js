import './App.css';
import "./less/style.less";
import CardList from "./components/CardList";
import {useEffect, useRef, useState} from "react";
import axios from "axios";


function App() {

    const [appState, setAppState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [flag, setFlag] = useState(false);

    const handleScroll = () => {
        if ((app.scrollHeight - app.scrollTop) === app.clientHeight) {

            setCurrentPage(currentPage + 1)

            /* Добавление карточек героев */
            // setAppState(apiUrl)
            // fetchHeroes(currentPage, 'down')

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

        // let app = document.getElementById('app')
        // let cards = document.getElementById('cards')

        axios.get(apiUrl, {
            params: {
                page: currentPage
            }
        }).then((resp) => {
            const allHeroes = resp.data;
            appState.length < 1 ? setAppState(allHeroes.results) : setAppState(() => [...appState, ...allHeroes.results]);
        });

        // app.addEventListener("scroll", (event) => {
        //     event.preventDefault()

            /* Условие скролла при достижении низа страницы */
            // if ((app.scrollHeight - app.scrollTop) === app.clientHeight) {
            //
            //     setCurrentPage(currentPage + 1)

                /* Добавление карточек героев */
                // setAppState(apiUrl)
                // fetchHeroes(currentPage, 'down')

                /* Удаление карточек героев */
                // if (cards.childElementCount >= 40) {
                //
                //     setAppState(prevState => (
                //         prevState.filter((item, index) => index > 20)))
                    // setAppState(prevState => {
                    //     const newArray = [...prevState];
                    //     newArray.splice(0, 20);
                    //     return newArray;
                    // })

            //     }
            // }

            /* Условие скролла при достижении верха страницы */
            // if (app.scrollTop === 0 && cards.childElementCount >= 40 && currentPage > 2) {
            //
            //     app.scrollTop = 50

                // setCurrentPage(currentPage - 1)
                //     /* Добавление карточек героев */
                //     fetchHeroes(currentPage - 1, 'up')
                //
                /* Удаление карточек героев */
                // setAppState(prevState => {
                //     const newArray = [...prevState];
                //     newArray.reverse().splice(0, 20);
                //     return newArray.reverse();
                // })
            // }
        // });

    }, [setAppState, setCurrentPage, currentPage]);

    console.log(currentPage)
    console.log(appState)

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
