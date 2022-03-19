class MovieRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Movies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          interestingMovieName TEXT,
          leadActor TEXT,
          leadActress TEXT,
          yearOfRelease TEXT,
          directorName TEXT)`
        return this.dao.run(sql)
    }

    create(movieData) {
        const { interestingMovieName, leadActor, leadActress, yearOfRelease, directorName } = movieData
        console.log("Added Movie\n")
        return this.dao.run(
            `INSERT INTO Movies (interestingMovieName, leadActor, leadActress, yearOfRelease, directorName)
            VALUES (?, ?, ?, ?, ?)`,
            [interestingMovieName, leadActor, leadActress, yearOfRelease, directorName])
    }

    update(task) {
        const { id, interestingMovieName, leadActor, leadActress, yearOfRelease, directorName } = task
        console.log("Movie updated")
        return this.dao.run(
            `UPDATE Movies
          SET interestingMovieName = ?,
          leadActor = ?,
          leadActress = ?,
          yearOfRelease = ?
          directorName = ?
          WHERE id = ?`,
            [interestingMovieName, leadActor, leadActress, yearOfRelease, directorName, id]
        )
    }

    delete(id) {
        console.log("Movie deleted")
        return this.dao.run(
            `DELETE FROM Movies WHERE id = ?`,
            [id]
        )
    }

    getById(movieId) {
        console.log("Display Movie by Id\n")
        return this.dao.get(
            `SELECT * FROM Movies WHERE id = ?`,
            [movieId])
    }

    getAllMovies() {
        console.log("Display All Movies\n")
        return this.dao.all(
            `SELECT * FROM Movies`)
    }
    getMoviesOfActor(leadActor) {
        console.log("Display Movies of actor\n")
        return this.dao.all(
            `SELECT * FROM Movies where leadActor =?`,
            [leadActor])
    }
}

module.exports = MovieRepository;