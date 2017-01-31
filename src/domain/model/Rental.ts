import Money from './Money';
import Movie from './Movie';
import DomainException from "../DomainException";

class Rental {
    public movie: Movie;
    public days: number;

    constructor(movie: Movie, days: number) {
        this.movie = movie;
        this.days = days;
    }

    public getRentalPrice(): Money {
        const moviePrice = this.movie.price;
        return this.computeRentalPrice(
            moviePrice.basePrice,
            moviePrice.pricePerExtraDay,
            this.movie.rentalDays,
            this.days);
    }

    public getFrequentRenterPoints(): number {
        if (this.days < this.movie.frequentRenterMinimumDays) {
            return this.movie.frequentRenterBasePoints;
        } else {
            return this.movie.frequentRenterPointsForExtraDays;
        }
    }

    public computeRentalPrice(basePrice: Money,
                              pricePerExtraDay: Money,
                              minimumRentalDays: number,
                              daysRented: number): Money {
        if (daysRented <= 0) {
            throw new DomainException('daysRented must be higher than zero');
        }

        let price = basePrice;

        daysRented = Math.ceil(daysRented);

        if (daysRented > minimumRentalDays) {
            price = price.add(pricePerExtraDay.times(daysRented - minimumRentalDays));
        }

        return price;
    }
}

export default Rental;
