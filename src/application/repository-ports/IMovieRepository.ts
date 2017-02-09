import Movie from '../../domain/model/entities/Movie';

interface IMovieRepository {
    findOneByTitle: (title: string) => Movie;
    insert: (movie: Movie) => void;
    update: (movie: Movie) => void;
}

export default IMovieRepository;
