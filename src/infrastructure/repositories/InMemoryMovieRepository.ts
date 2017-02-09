import Movie from '../../domain/model/entities/Movie';
import IMovieRepository from '../../application/repository-ports/IMovieRepository';
import InfrastructureException from "../InfrastructureException";


export class InMemoryMovieRepository implements IMovieRepository {
    private movies: Movie[];

    constructor() {
        this.movies = [];
    }

    private findByTitle(title: string): Movie[] {
        return this.movies.filter((movie: Movie) => (movie.title === title));
    }

    public findOneByTitle(title: string): Movie {
        return this.findByTitle(title)[0];
    }

    public insert(movie: Movie): void {
        if (this.findByTitle(movie.title).length > 0) {
            throw new InfrastructureException('Movie already exists');
        }
        this.movies.push(movie);
    }

    public update(movie: Movie): void {
        let moviesWithSameTitle = this.findByTitle(movie.title);
        if (moviesWithSameTitle.length === 0) {
            throw new InfrastructureException('Movie does not exist');
        }
        this.movies = [...this.movies.filter((m) => (m.title !== movie.title)), movie];
    }

}

const movieRepository = new InMemoryMovieRepository();

export default movieRepository;
