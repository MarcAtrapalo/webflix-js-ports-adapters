import Order from '../entities/Order';
import Rental from '../entities/Rental';
import Customer from '../entities/Customer';
import RentalBuilder from './test-builders/RentalBuilder';
import MovieBuilder from './test-builders/MovieBuilder';
import Money from '../valueObjects/Money';
import Currency from '../valueObjects/Currency';
const sinon = require('sinon');

describe('Order', () => {

    let sut: Order, rentalBuilder: RentalBuilder, movieBuilder: MovieBuilder;

    beforeEach(() => {
        sut = new Order('testId', new Customer('Mr. Test'));
        rentalBuilder = new RentalBuilder();
        movieBuilder = new MovieBuilder();
    });

    it('should have no rentals at the beginning', () => {
        sut.rentalList.should.be.empty;
    });

    it('should have price 0 if there are no rentals', () => {
        sut.getTotalPrice().amount.should.equal(0);
    });

    it('should have 0 points if there are no rentals', () => {
        sut.getTotalFrequentRenterPoints().should.equal(0);
    });

    it('should sum the price of all rentals', () => {
        let rental1 = rentalBuilder.withMovie(movieBuilder.withTitle('Movie 1').build()).build();
        let rental2 = rentalBuilder.withMovie(movieBuilder.withTitle('Movie 2').build()).build();
        let stub1 = sinon.stub(rental1, 'getRentalPrice').returns(new Money(5, new Currency('EUR')));
        let stub2 = sinon.stub(rental2, 'getRentalPrice').returns(new Money(10, new Currency('EUR')));
        sut.addRental(rental1);
        sut.addRental(rental2);
        sut.getTotalPrice().amount.should.equal(15);
    });

    it('should sum the points of all rentals', () => {
        let rental1 = rentalBuilder.withMovie(movieBuilder.withTitle('Movie 1').build()).build();
        let rental2 = rentalBuilder.withMovie(movieBuilder.withTitle('Movie 2').build()).build();
        let stub1 = sinon.stub(rental1, 'getFrequentRenterPoints').returns(1);
        let stub2 = sinon.stub(rental2, 'getFrequentRenterPoints').returns(2);
        sut.addRental(rental1);
        sut.addRental(rental2);
        sut.getTotalFrequentRenterPoints().should.equal(3);
    });

    it('should not allow adding the same movie twice');

});
