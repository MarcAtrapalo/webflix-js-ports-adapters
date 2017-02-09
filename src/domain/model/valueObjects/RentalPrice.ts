import Money from './Money';

class RentalPrice {
    public basePrice: Money;
    public pricePerExtraDay: Money;

    constructor(basePrice: Money, pricePerExtraDay: Money) {
        this.basePrice = basePrice;
        this.pricePerExtraDay = pricePerExtraDay;
    }

    public equals(price: RentalPrice): boolean {
        return this.basePrice.equals(price.basePrice) &&
            this.pricePerExtraDay.equals(price.pricePerExtraDay);
    }
}

export default RentalPrice;
