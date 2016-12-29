import RentalPrice from '../RentalPrice';

class Movie {

    public title: string;
    public price: RentalPrice;
    public rentalDays: number;

    constructor(title: string, price: RentalPrice, rentalDays: number) {
        this.title = title;
        this.price = price;
        this.rentalDays = rentalDays;
    }
}

export default Movie;
