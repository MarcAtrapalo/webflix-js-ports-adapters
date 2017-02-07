import RentalPrice from '../../RentalPrice';
import Money from '../../Money';
import Currency from '../../Currency';

class RentalPriceBuilder {

    private basePrice: Money;
    private pricePerExtraDay: Money;

    constructor() {
        this.basePrice = new Money(1, new Currency('EUR'));
        this.pricePerExtraDay = new Money(10, new Currency('EUR'));
    }

    public withBasePrice(basePrice: Money) {
        this.basePrice = basePrice;
        return this;
    }

    public withPricePerExtraDay(pricePerExtraDay: Money) {
        this.pricePerExtraDay = pricePerExtraDay;
        return this;
    }

    public build(): RentalPrice {
        return new RentalPrice(this.basePrice, this.pricePerExtraDay);
    }
}

export default RentalPriceBuilder;
