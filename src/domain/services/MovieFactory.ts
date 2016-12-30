import Movie from '../model/Movie';
import Currency from '../model/Currency';
import Money from '../model/Money';
import RentalPrice from '../model/RentalPrice';

export enum IMovieType {
    NEW_RELEASE,
    REGULAR,
    CHILDRENS,
}

/** Concrete movie types values */
export const NEW_RELEASE_MOVIE_RENTAL_DAYS = 0;
export const NEW_RELEASE_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(0, new Currency('EUR')),
    new Money(3, new Currency('EUR')),
);

export const REGULAR_MOVIE_RENTAL_DAYS = 2;
export const REGULAR_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(2, new Currency('EUR')),
    new Money(1.5, new Currency('EUR')),
);

export const CHILDRENS_MOVIE_RENTAL_DAYS = 3;
export const CHILDRENS_MOVIE_RENTAL_PRICE = new RentalPrice(
    new Money(1.5, new Currency('EUR')),
    new Money(1.5, new Currency('EUR')),
);

export class MovieFactory {

    public createMovie(title: string, type: IMovieType) {
        switch (type) {
            case IMovieType.NEW_RELEASE:
                return new Movie(title, NEW_RELEASE_MOVIE_RENTAL_PRICE, NEW_RELEASE_MOVIE_RENTAL_DAYS);
            case IMovieType.REGULAR:
                return new Movie(title, REGULAR_MOVIE_RENTAL_PRICE, REGULAR_MOVIE_RENTAL_DAYS);
            case IMovieType.CHILDRENS:
                return new Movie(title, CHILDRENS_MOVIE_RENTAL_PRICE, CHILDRENS_MOVIE_RENTAL_DAYS);
            default:
                throw new Error('Unexpected Movie Type');
        }
    }

}

const movieFactoryService = new MovieFactory();

export default movieFactoryService;
