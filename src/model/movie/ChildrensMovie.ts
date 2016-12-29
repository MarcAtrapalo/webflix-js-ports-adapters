import Movie from './Movie';
import RentalPrice from '../RentalPrice';
import Currency from '../Currency';
import Money from '../Money';

export const CHILDRENS_MOVIE_RENTAL_DAYS = 3;
export const CHILDRENS_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(1.5, new Currency('EUR')),
    new Money(1.5, new Currency('EUR'))
);

class ChildrensMovie extends Movie {

    constructor(title: string) {
        super(title, CHILDRENS_MOVIE_RENTAL_PRICE, CHILDRENS_MOVIE_RENTAL_DAYS);
    }

}

export default ChildrensMovie;
