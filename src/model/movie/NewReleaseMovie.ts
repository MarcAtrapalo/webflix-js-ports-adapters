import Movie from './Movie';
import RentalPrice from '../RentalPrice';
import Currency from '../Currency';
import Money from '../Money';

export const NEW_RELEASE_MOVIE_RENTAL_DAYS = 0;
export const NEW_RELEASE_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(0, new Currency('EUR')),
    new Money(3, new Currency('EUR'))
);

class NewReleaseMovie extends Movie {

    constructor(title: string) {
        super(title, NEW_RELEASE_MOVIE_RENTAL_PRICE, NEW_RELEASE_MOVIE_RENTAL_DAYS);
    }

}

export default NewReleaseMovie;
