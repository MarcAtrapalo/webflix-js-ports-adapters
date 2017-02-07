import Rental from '../../Rental';
import Movie from '../../Movie';
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
        return this;
    }

    public withDays(days: number) {
        this.days = days;
        return this;
    }

    build(): Rental {
        return new Rental(this.movie, this.days);
    }

}

export default RentalBuilder;
