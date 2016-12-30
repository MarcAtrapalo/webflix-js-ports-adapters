import MovieRepository from '../../infrastructure/repositories/MovieRepository';
import Movie from '../../domain/model/Movie';
import MovieFactory from '../../domain/services/MovieFactory';
import {IMovieType} from "../../domain/services/MovieFactory";


class AddMovieUseCase {

    private movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    private getMovieType(type: string): IMovieType {
        switch (type) {
            case 'new_release':
                return IMovieType.NEW_RELEASE;
            case 'regular':
                return IMovieType.REGULAR;
            case 'children':
                return IMovieType.CHILDRENS;
            default:
                throw new Error('Unexpected movie type');
        }
    }

    public execute(title: string, type: string) {
        let movieType = this.getMovieType(type);
        let movie = MovieFactory.createMovie(title, movieType);
        MovieRepository.add(movie);
    }

}

export default AddMovieUseCase;
