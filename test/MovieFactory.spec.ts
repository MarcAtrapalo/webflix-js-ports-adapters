import MovieFactory, {
    IMovieType, CHILDRENS_MOVIE_RENTAL_PRICE,
    CHILDRENS_MOVIE_RENTAL_DAYS
} from '../src/domain/services/MovieFactory';
import Movie from '../src/domain/model/Movie';

describe('MovieFactory', () => {

    it('should return a Movie', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).should.be.an.instanceof(Movie);
    });

    it('should create a movie with the provided title', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).should.have.property('title', 'Test');
    });

    it('should create a movie with the price of its type', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).price.should.deep.equal(CHILDRENS_MOVIE_RENTAL_PRICE);
    });

    it('should create a Movie with the days of its type', () => {
        MovieFactory.createMovie('Test', IMovieType.CHILDRENS).rentalDays.should.equal(CHILDRENS_MOVIE_RENTAL_DAYS);
    });

    it('should throw for unexisting type', () => {
        MovieFactory.createMovie.bind(MovieFactory, 'Test', -1).should.throw(Error);
    });

});
