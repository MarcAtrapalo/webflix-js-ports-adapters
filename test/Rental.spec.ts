import Rental from '../src/model/Rental';
import RentalBuilder from './builders/RentalBuilder';
const sinon = require('sinon');

describe('Rental', () => {

    describe('when calling getRentalPrice', () => {

        it('should call computeRentalPrice', () => {
            const rental = (new RentalBuilder()).build();
            const spy = sinon.spy(rental, 'computeRentalPrice');
            rental.getRentalPrice();
            spy.should.have.been.called;
        });

    });

});
