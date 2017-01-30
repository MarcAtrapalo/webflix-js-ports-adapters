import Movie from '../../domain/model/Movie';
import IMovieRepository from '../../application/repository-ports/IMovieRepository';


export class InMemoryMovieRepository implements IMovieRepository {
    private movies: Movie[];

    constructor() {
        this.movies = [];
    }

    private getMoviesByTitle(title: string): Movie[] {
        return this.movies.filter((movie: Movie) => (movie.title === title));
    }

    public getMovieByTitle(title: string): Movie {
        return this.getMoviesByTitle(title)[0];
    }

    public add(movie: Movie): void {
        if (this.getMoviesByTitle(movie.title).length > 0) {
            throw new Error('Movie already exists');
        }
        this.movies.push(movie);
    }

    public update(movie: Movie): void {
        let moviesWithSameTitle = this.getMoviesByTitle(movie.title);
        if (moviesWithSameTitle.length === 0) {
            throw new Error('Movie does not exist');
        }
        this.movies = [...this.movies.filter((m) => (m.title !== movie.title)), movie];
    }

}

const movieRepository = new InMemoryMovieRepository();

export default movieRepository;
