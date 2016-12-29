import Movie from './Movie';
import RentalPrice from '../RentalPrice';
import Currency from '../Currency';
import Money from '../Money';

export const REGULAR_MOVIE_RENTAL_DAYS = 2;
export const REGULAR_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(2, new Currency('EUR')),
    new Money(1.5, new Currency('EUR')),
);

class RegularMovie extends Movie {

    constructor(title: string) {
        super(title, REGULAR_MOVIE_RENTAL_PRICE, REGULAR_MOVIE_RENTAL_DAYS);
    }

}

export default RegularMovie;
