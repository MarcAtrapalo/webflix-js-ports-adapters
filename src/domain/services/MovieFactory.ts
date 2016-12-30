import Movie from '../model/Movie';
import Currency from '../model/Currency';
import Money from '../model/Money';
import RentalPrice from '../model/RentalPrice';

export enum IMovieType {
    NEW_RELEASE,
    REGULAR,
    CHILDRENS,
}

export interface IMovieTypeParams {
    rentalDays: number;
    rentalPrice: RentalPrice;
    pointsMinimumDays: number;
    basePoints: number;
    pointsForExtraDays?: number;
}

export interface IMovieTypeParamsMap {
    [index: number]: IMovieTypeParams;
}

/** Concrete movie types values */
export const MOVIE_TYPES_PARAMS: IMovieTypeParamsMap = {
    [IMovieType.NEW_RELEASE]: {
        rentalDays: 0,
        rentalPrice: new RentalPrice(
            new Money(0, new Currency('EUR')),
            new Money(3, new Currency('EUR')),
        ),
        pointsMinimumDays: 1,
        basePoints: 1,
        pointsForExtraDays: 2,
    },
    [IMovieType.REGULAR]: {
        rentalDays: 2,
        rentalPrice: new RentalPrice(
            new Money(2, new Currency('EUR')),
            new Money(1.5, new Currency('EUR')),
        ),
        pointsMinimumDays: 0,
        basePoints: 1,
    },
    [IMovieType.CHILDRENS]: {
        rentalDays: 3,
        rentalPrice: new RentalPrice(
            new Money(1.5, new Currency('EUR')),
            new Money(1.5, new Currency('EUR')),
        ),
        pointsMinimumDays: 0,
        basePoints: 1,
    },
};


export class MovieFactory {

    public createMovie(title: string, type: IMovieType): Movie {
        const params = MOVIE_TYPES_PARAMS[type];

        if (typeof params !== 'undefined') {
            return new Movie(title, params.rentalPrice, params.rentalDays,
                params.pointsMinimumDays, params.basePoints, params.pointsForExtraDays);
        } else {
            throw new Error('Unexpected Movie Type');
        }
    }

}

const movieFactoryService = new MovieFactory();

export default movieFactoryService;
