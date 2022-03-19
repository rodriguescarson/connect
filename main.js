const AppDAO = require('./dao')
const MovieRepository = require('./movies_repository')
function main() {
    const dao = new AppDAO('./database.sqlite3')
    const movieData = [{
        interestingMovieName: 'The Batman',
        leadActor: 'Robert Pattinson',
        leadActress: 'Zoë Kravitz',
        yearOfRelease: '2022-03-08 00:00:00.000',
        directorName: 'Matt Reeves'
    },
    {
        interestingMovieName: 'Twilight 2008',
        leadActor: 'Robert Pattinson',
        leadActress: 'Christina Kravitz',
        yearOfRelease: '2008-03-08 00:00:00.000',
        directorName: 'Catherine Hardwicke'
    }
    ]

    const movieRepo = new MovieRepository(dao)

    //create movie table if not exits
    movieRepo.createTable()

    //Add movie data to table
    movieRepo.create(movieData[0])
    movieRepo.create(movieData[1])
    //Display all movies from table
    movieRepo.getAllMovies().then((data) => {
        console.log(data)
    })

    //dispaly movies of a particular actor
    movieRepo.getMoviesOfActor('Robert Pattinson').then((data) => {
        console.log(data)
    })

    //display movie by id
    movieRepo.getById(1).then(data => {
        console.log(data)
    })

    //delete movie by id
    movieRepo.delete(1)
}

main()