import Movie from '../../domain/model/Movie';

interface IMovieRepository {
    getMovieByTitle: (title: string) => Movie;
    add: (movie: Movie) => void;
    update: (movie: Movie) => void;
}

export default IMovieRepository;
