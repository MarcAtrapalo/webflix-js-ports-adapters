import Money from './Money';
import Movie from './Movie';

class Rental {
    public movie: Movie;
    public days: number;

    constructor(movie: Movie, days: number) {
        this.movie = movie;
        this.days = days;
    }

    public getRentalPrice() {
        const moviePrice = this.movie.price;
        return this.computeRentalPrice(
            moviePrice.basePrice,
            moviePrice.pricePerExtraDay,
            this.movie.rentalDays,
            this.days);
    }

    public computeRentalPrice(basePrice: Money,
                              pricePerExtraDay: Money,
                              minimumRentalDays: number,
                              daysRented: number): Money {
        let price = basePrice;

        if (daysRented > minimumRentalDays) {
            price = price.add(pricePerExtraDay.times(daysRented - minimumRentalDays));
        }

        return price;
    }
}

export default Rental;
