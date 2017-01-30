import Rental from './Rental';
import RentalBuilder from './test-builders/RentalBuilder';
import Money from './Money';
import Currency from "./Currency";
import MovieBuilder from "./test-builders/MovieBuilder";
import RentalPriceBuilder from "./test-builders/RentalPriceBuilder";
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

    it('should give movie base points if minimumDays are not exceeded', () => {
        const movie = (new MovieBuilder()
            .withFrequentRenterMinimumDays(6)
            .withFrequentRenterBasePoints(1)
            .withFrequentRenterPointsForExtraDays(2)
        ).build();
        const sut = (new RentalBuilder().withDays(5).withMovie(movie)).build();
        sut.getFrequentRenterPoints().should.equal(1);
    });

    it('should give movie extra points if minimumDays are exceeded', () => {
        const movie = (new MovieBuilder()
                .withFrequentRenterMinimumDays(6)
                .withFrequentRenterBasePoints(1)
                .withFrequentRenterPointsForExtraDays(2)
        ).build();
        const sut = (new RentalBuilder().withDays(6).withMovie(movie)).build();
        sut.getFrequentRenterPoints().should.equal(2);
    });

    describe('when calling getRentalPrice', () => {

        it('should call computeRentalPrice', () => {
            const rental = (new RentalBuilder()).build();
            const spy = sinon.spy(rental, 'computeRentalPrice');
            rental.getRentalPrice();
            spy.should.have.been.called;
        });

        it('should call computeRentalPrice with the correct params', () => {
            const rentalPrice = (new RentalPriceBuilder().withBasePrice(fiveEuros).withPricePerExtraDay(tenEuros)).build();
            const movie = (new MovieBuilder().withPrice(rentalPrice).withRentalDays(4)).build();
            const rental = (new RentalBuilder().withDays(1).withMovie(movie)).build();

            const spy = sinon.spy(rental, 'computeRentalPrice');
            rental.getRentalPrice();
            spy.should.have.been.calledWithExactly(fiveEuros, tenEuros, 4, 1);
        });

    });

});
