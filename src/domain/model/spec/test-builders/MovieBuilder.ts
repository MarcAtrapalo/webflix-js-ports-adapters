import Movie from '../../entities/Movie';
import RentalPrice from '../../valueObjects/RentalPrice';
import RentalPriceBuilder from './RentalPriceBuilder';

class MovieBuilder {

    private title: string;
    private price: RentalPrice;
    private type: string;
    private rentalDays: number;
    public frequentRenterMinimumDays: number;
    public frequentRenterBasePoints: number;
    public frequentRenterPointsForExtraDays: number;

    constructor() {
        this.title = 'Test Movie';
        const rentalPriceBuilder = new RentalPriceBuilder();
        this.price = rentalPriceBuilder.build();
        this.rentalDays = 1;
        this.frequentRenterMinimumDays = 0;
        this.frequentRenterBasePoints = 1;
        this.frequentRenterPointsForExtraDays = 1;
    }

    public withTitle(title: string) {
        this.title = title;
        return this;
    }

    public withPrice(price: RentalPrice) {
        this.price = price;
        return this;
    }

    public withType(type: string) {
        this.type = type;
        return this;
    }

    public withRentalDays(rentalDays: number) {
        this.rentalDays = rentalDays;
        return this;
    }

    public withFrequentRenterMinimumDays(minimumDays: number) {
        this.frequentRenterMinimumDays = minimumDays;
        return this;
    }

    public withFrequentRenterBasePoints(basePoints: number) {
        this.frequentRenterBasePoints = basePoints;
        return this;
    }

    public withFrequentRenterPointsForExtraDays(points: number) {
        this.frequentRenterPointsForExtraDays = points;
        return this;
    }

    build(): Movie {
        return new Movie(this.title, this.price, this.type, this.rentalDays,
            this.frequentRenterMinimumDays, this.frequentRenterBasePoints, this.frequentRenterPointsForExtraDays);
    }

}

export default MovieBuilder;
