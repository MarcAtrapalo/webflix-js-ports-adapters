import Rental from './Rental';
import Customer from './Customer';
import Money from './Money';
import Currency from './Currency';

class Order {
    public rentalList: Rental[];
    public customer: Customer;

    constructor(customer: Customer) {
        this.customer = customer;
        this.rentalList = [];
    }

    public addRental(rental: Rental): void {
        this.rentalList.push(rental);
    }

    public getTotalPrice(): Money {
        return this.rentalList.reduce((accumulatedMoney: Money, rental: Rental): Money => {
            return accumulatedMoney.add(rental.getRentalPrice());
        }, new Money(0, new Currency('EUR')));
    }

    public getTotalFrequentRenterPoints(): number {
        return this.rentalList.reduce((accumulatedPoints: number, rental: Rental): number => {
            return accumulatedPoints + rental.getFrequentRenterPoints();
        }, 0);
    }
}

export default Order;
