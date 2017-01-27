import IMovieRepository from '../../infrastructure/repositories/IMovieRepository';
import Movie from '../../domain/model/Movie';
import MovieFactory, {IMovieType} from '../../domain/services/MovieFactory';


class AddMovieUseCase {

    private movieRepository: IMovieRepository;

    constructor(movieRepository: IMovieRepository) {
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
        this.movieRepository.add(movie);
    }

}

export default AddMovieUseCase;
