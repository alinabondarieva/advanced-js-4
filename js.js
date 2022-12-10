// Поясніть своїми словами, що таке AJAX і чим він корисний при розробці Javascript.
//можливість писать асинхронний java script код. це підхід до побудови інтерфейсів, що уможливлює обмін данних між браузером та сервіром у фоновому режимі. 


// Завдання
// Отримати список фільмів серії Зоряні війни та вивести на екран список персонажів для кожного з них.
// Технічні вимоги:
// Надіслати AJAX запит на адресу https://ajax.test-danit.com/api/swapi/films та отримати список усіх фільмів серії Зоряні війни
// Для кожного фільму отримати з сервера список персонажів, які були показані у цьому фільмі. Список персонажів можна отримати з властивості characters.
// Як тільки з сервера буде отримана інформація про фільми, відразу вивести список усіх фільмів на екрані. Необхідно вказати номер епізоду, назву фільму,
// а також короткий зміст (поля episodeId, name, openingCrawl).
// Як тільки з сервера буде отримано інформацію про персонажів будь-якого фільму, вивести цю інформацію на екран під назвою фільму.


const baseUrl = "https://ajax.test-danit.com/api/swapi/films"
fetch(baseUrl)
.then((data) => data.json())
.then((data) => {
    data.forEach(film => {
        console.log(film)
        const id = film.episodeId
        renderMovie(film, id)
        getMovieCharacters(film.characters)
        .then(characterList => renderCharacters(characterList, id))
    });
})

function renderMovie(film, id){
const parent = document.querySelector("#root")
parent.insertAdjacentHTML("beforeend", `<li id=${id}><h2>${film.name}</h2><p>${film.episodeId}</p><p>${film.openingCrawl}</p></li>`)
}

function getMovieCharacters(links){
    return new Promise((resolve, reject) => {
        const characters = []
        links.forEach(link => {
            fetch (link)
            .then(res => res.json()) //ответ распаковки
            .then(character => {
                characters.push(character.name)
                if(characters.length === links.length){
                    resolve(characters)
                }
            })
        })
    })
}

function renderCharacters(characterList, id){
 const episode = document.getElementById(id)
episode.insertAdjacentHTML("beforeend", `<ul>${characterList.map(item => {
    return `<li>${item}</li>`
}).join("")}</ul>`)
}