import Rental from '../../src/model/Rental';
import Movie from '../../src/model/Movie';
import MovieBuilder from './MovieBuilder';

class RentalBuilder {

    private movie: Movie;
    private days: number;

    constructor() {
        const movieBuilder = new MovieBuilder();
        this.movie = movieBuilder.build();
        this.days = 1;
    }

    public withMovie(movie: Movie) {
        this.movie = movie;
    }

    public withDays(days: number) {
        this.days = days;
    }

    build(): Rental {
        return new Rental(this.movie, this.days);
    }

}

export default RentalBuilder;
