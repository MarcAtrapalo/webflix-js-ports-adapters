import Rental from '../src/model/Rental';
import RentalBuilder from './builders/RentalBuilder';
import Money from '../src/model/Money';
import Currency from "../src/model/Currency";
const sinon = require('sinon');

describe('Rental', () => {

    let sut: Rental, tenEuros: Money, fiveEuros: Money, zeroEuros: Money, cost: Money;

    before(() => {
        sut = (new RentalBuilder()).build();
        tenEuros = new Money(10, new Currency('EUR'));
        fiveEuros = new Money(5, new Currency('EUR'));
        zeroEuros = new Money(0, new Currency('EUR'));
    });

    it('should throw when movie is rented for zero or less days', () => {
        sut.computeRentalPrice.bind(sut, tenEuros, tenEuros, 5, 0).should.throw(Error);
    });

    it('should cost base price when movie is rented for less than its rentalDays', () => {
        cost = sut.computeRentalPrice(tenEuros, fiveEuros, 5, 2);
        cost.amount.should.equal(tenEuros.amount);
    });

    it('should cost base price when movie is rented extra days but price per extra day is zero', () => {
        cost = sut.computeRentalPrice(tenEuros, zeroEuros, 5, 6);
        cost.amount.should.equal(tenEuros.amount);
    });

    it('should cost price per extra day when base price is zero and is rented for one extra day', () => {
        cost = sut.computeRentalPrice(zeroEuros, tenEuros, 1, 2);
        cost.amount.should.equal(tenEuros.amount);
    });

    it('should cost price per extra day per each extra day', () => {
        const minDays = 5,
            rentedFor = 7;
        cost = sut.computeRentalPrice(fiveEuros, tenEuros, minDays, rentedFor);
        cost.amount.should.equal(fiveEuros.amount + (tenEuros.amount * (rentedFor - minDays)));
    });

    it('should cost the whole extra day after the day started', () => {
        const minDays = 5,
            rentedFor = 5.1;
        cost = sut.computeRentalPrice(fiveEuros, tenEuros, minDays, rentedFor);
        cost.amount.should.equal(fiveEuros.amount + tenEuros.amount);
    });

    describe('when calling getRentalPrice', () => {

        it('should call computeRentalPrice', () => {
            const rental = (new RentalBuilder()).build();
            const spy = sinon.spy(rental, 'computeRentalPrice');
            rental.getRentalPrice();
            spy.should.have.been.called;
        });

        it('should call computeRentalPrice with the correct params');

    });

});
