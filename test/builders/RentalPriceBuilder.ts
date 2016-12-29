import RentalPrice from '../../src/model/RentalPrice';
import Money from '../../src/model/Money';
import Currency from '../../src/model/Currency';

class RentalPriceBuilder {

    private basePrice: Money;
    private pricePerExtraDay: Money;

    constructor() {
        this.basePrice = new Money(1, new Currency('EUR'));
        this.pricePerExtraDay = new Money(10, new Currency('EUR'));
    }

    public withBasePrice(basePrice: Money) {
        this.basePrice = basePrice;
    }

    public withPricePerExtraDay(pricePerExtraDay: Money) {
        this.pricePerExtraDay = pricePerExtraDay;
    }

    public build(): RentalPrice {
        return new RentalPrice(this.basePrice, this.pricePerExtraDay);
    }
}

export default RentalPriceBuilder;
