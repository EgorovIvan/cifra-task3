let app = document.getElementById('app')
let cards = document.getElementById('cards')
let arrayData = []
let currentPage = 1


/* Функция загрузки карточек героев */
async function fetchHeroes(page, direction) {
  try {
    const params = {
      page: page,
    }

    /* Запрос на получение данных карточек */
    const {data} = await axios.get('https://rickandmortyapi.com/api/character', {
      params
    });

    arrayData = [...data.results]

    if (direction == 'up') {
      arrayData = arrayData.reverse()
    }

    /* Добавление карточек на страницу */
    for (const item of arrayData) {

      let divItem = document.createElement('div')
      let img = document.createElement('img')
      let divContent = document.createElement('div')
      let h2 = document.createElement('h2')
      let status = document.createElement('p')
      let titleLocation = document.createElement('h3')
      let textLocation = document.createElement('p')

      divItem.className = 'main__item'
      img.className = 'main__item-img'
      divContent.className = 'main__item-content'
      h2.className = 'item-content__name'
      status.className = 'item-content__status'
      titleLocation.className = 'item-content__subtitle'
      textLocation.className = 'item-content__text'

      img.src = item.image
      h2.textContent = item.name
      status.textContent = item.species
      titleLocation.textContent = 'Last known location:'
      textLocation.textContent = item.location.name

      divItem.append(img)
      divItem.append(divContent)
      divContent.append(h2)
      divContent.append(status)
      divContent.append(titleLocation)
      divContent.append(textLocation)

      switch (direction) {
        case 'up':
          cards.prepend(divItem)
          break;
        case 'down':
          cards.append(divItem)
          break;
        default:
          break;
      }
    }
  } catch (err) {
    console.log(err);
    alert(err.message ? err.message : err);
  }
}

/* Загрузка при первой загрузке страницы */
fetchHeroes(currentPage, 'down')


app.addEventListener("scroll", (event) => {
  event.preventDefault()

  /* Условие скролла при достижении низа страницы */
  if ((app.scrollHeight - app.scrollTop) === app.clientHeight) {

    currentPage += 1

    /* Добавление карточек героев */
    fetchHeroes(currentPage, 'down')

    /* Удаление карточек героев */
    if (cards.childElementCount >= 40) {
      for (let i = 0; i < 20; i++) {
        cards.removeChild(cards.firstChild);
      }
    }
  }


  /* Условие скролла при достижении верха страницы */
  if (app.scrollTop === 0 && cards.childElementCount >= 40 && currentPage > 2) {

    app.scrollTop = 50

    currentPage -= 1
    /* Добавление карточек героев */
    fetchHeroes(currentPage - 1, 'up')

    /* Удаление карточек героев */
    for (let i = 0; i < 20; i++) {
      cards.removeChild(cards.lastChild);
    }
  }
});


