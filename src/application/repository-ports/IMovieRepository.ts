import Movie from '../../domain/model/entities/Movie';

interface IMovieRepository {
    getMovieByTitle: (title: string) => Movie;
    add: (movie: Movie) => void;
    update: (movie: Movie) => void;
}

export default IMovieRepository;
