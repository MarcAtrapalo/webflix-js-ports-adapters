import RentalPrice from './RentalPrice';

class Movie {

    public title: string;
    public price: RentalPrice;
    public rentalDays: number;
    public frequentRenterMinimumDays: number;
    public frequentRenterBasePoints: number;
    public frequentRenterPointsForExtraDays: number;

    constructor(title: string,
                price: RentalPrice,
                rentalDays: number,
                frequentRenterMinimumDays: number,
                frequentRenterBasePoints: number,
                frequentRenterPointsForExtraDays?: number) {
        this.title = title;
        this.price = price;
        this.rentalDays = rentalDays;
        this.frequentRenterMinimumDays = frequentRenterMinimumDays;
        this.frequentRenterBasePoints = frequentRenterBasePoints;

        // If points for extra days was not specified, it shall be the same as base points.
        if (typeof frequentRenterPointsForExtraDays !== 'undefined') {
            this.frequentRenterPointsForExtraDays = frequentRenterPointsForExtraDays;
        } else {
            this.frequentRenterPointsForExtraDays = frequentRenterBasePoints;
        }
    }
}

export default Movie;
