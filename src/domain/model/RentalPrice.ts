import Money from './Money';

class RentalPrice {
    public basePrice: Money;
    public pricePerExtraDay: Money;

    constructor(basePrice: Money, pricePerExtraDay: Money) {
        this.basePrice = basePrice;
        this.pricePerExtraDay = pricePerExtraDay;
    }
}

export default RentalPrice;
