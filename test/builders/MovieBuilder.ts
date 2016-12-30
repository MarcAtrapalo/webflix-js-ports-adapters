import Movie from '../../src/domain/model/Movie';
import RentalPrice from '../../src/domain/model/RentalPrice';
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
        return this;
    }

    public withPrice(price: RentalPrice) {
        this.price = price;
        return this;
    }

    public withRentalDays(rentalDays: number) {
        this.rentalDays = rentalDays;
        return this;
    }

    build(): Movie {
        return new Movie(this.title, this.price, this.rentalDays)
    }

}

export default MovieBuilder;
