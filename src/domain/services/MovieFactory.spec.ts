import MovieFactory, {IMovieType, MOVIE_TYPES_PARAMS} from './MovieFactory';
import Movie from '../model/entities/Movie';

describe('MovieFactory', () => {

    it('should return a Movie', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).should.be.an.instanceof(Movie);
    });

    it('should create a movie with the provided title', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).should.have.property('title', 'Test');
    });

    it('should create a movie with the price of its type', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).price.should.deep.equal(MOVIE_TYPES_PARAMS[IMovieType.CHILDRENS].rentalPrice);
    });

    it('should create a Movie with the days of its type', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).rentalDays.should.equal(MOVIE_TYPES_PARAMS[IMovieType.CHILDRENS].rentalDays);
    });

    it('should throw for unexisting type', () => {
        MovieFactory.createMovie.bind(MovieFactory, 'Test', -1).should.throw(Error);
    });

});
