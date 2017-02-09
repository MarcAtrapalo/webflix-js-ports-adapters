import Movie from '../model/entities/Movie';
import Currency from '../model/valueObjects/Currency';
import Money from '../model/valueObjects/Money';
import RentalPrice from '../model/valueObjects/RentalPrice';
import DomainException from "../DomainException";

export enum IMovieType {
    NEW_RELEASE,
    REGULAR,
    CHILDRENS,
}

export interface IMovieTypeParams {
    type: string;
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
        type: 'New Release Movie',
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
        type: 'Regular Movie',
        rentalDays: 2,
        rentalPrice: new RentalPrice(
            new Money(2, new Currency('EUR')),
            new Money(1.5, new Currency('EUR')),
        ),
        pointsMinimumDays: 0,
        basePoints: 1,
    },
    [IMovieType.CHILDRENS]: {
        type: 'Children Movie',
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
            return new Movie(title, params.rentalPrice, params.type, params.rentalDays,
                params.pointsMinimumDays, params.basePoints, params.pointsForExtraDays);
        } else {
            throw new DomainException('Unexpected Movie Type');
        }
    }

}

const movieFactoryService = new MovieFactory();

export default movieFactoryService;
