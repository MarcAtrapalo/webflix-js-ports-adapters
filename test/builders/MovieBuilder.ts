import Movie from '../../src/model/Movie';
import RentalPrice from '../../src/model/RentalPrice';
import RentalPriceBuilder from './RentalPriceBuilder';

class MovieBuilder {

    private title: string;
    private price: RentalPrice;
    private rentalDays: number;

    constructor() {
        this.title = 'Test Movie';
        const rentalPriceBuilder = new RentalPriceBuilder();
        this.price = rentalPriceBuilder.build();
        this.rentalDays = 1;
    }

    public withTitle(title: string) {
        this.title = title;
    }

    public withPrice(price: RentalPrice) {
        this.price = price;
    }

    public withRentalDays(rentalDays: number) {
        this.rentalDays = rentalDays;
    }

    build(): Movie {
        return new Movie(this.title, this.price, this.rentalDays)
    }

}

export default MovieBuilder;
