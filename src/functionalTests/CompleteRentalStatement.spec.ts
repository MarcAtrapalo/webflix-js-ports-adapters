import CustomerController from '../infrastructure/controllers/CustomerController';
import MovieController from '../infrastructure/controllers/MovieController';
import RentalController from '../infrastructure/controllers/RentalController';

const customerController = new CustomerController();
const movieController = new MovieController();
const rentalController = new RentalController();

const executeMoviesFixture = () => {
    movieController.addMovie({type: 'new_release', title: 'New Release 1'});
    movieController.addMovie({type: 'new_release', title: 'New Release 2'});
    movieController.addMovie({type: 'children', title: 'Children'});
    movieController.addMovie({type: 'regular', title: 'Regular 1'});
    movieController.addMovie({type: 'regular', title: 'Regular 2'});
    movieController.addMovie({type: 'regular', title: 'Regular 3'});
};

describe('Webflix', () => {

    before(() => {
        executeMoviesFixture();
    });

    it('should print a correct rental statement', () => {
        const name = 'Test';
        let sut;
        customerController.addCustomer({name});
        rentalController.addRental({customerName: name, movieTitle: 'Regular 1', rentalDuration: 1});
        rentalController.addRental({customerName: name, movieTitle: 'Regular 2', rentalDuration: 2});
        rentalController.addRental({customerName: name, movieTitle: 'Regular 3', rentalDuration: 3});
        const log = console.log;
        const spy = (s: string) => {
            sut = s;
            log(s);
        };
        console.log = spy;
        rentalController.printRentalStatement({customerName: name});
        console.log = log;
        sut.should.equal("Rental Record for Customer Name\n" +
            "\tRegular 1\t2.0\n" +
            "\tRegular 2\t2.0\n" +
            "\tRegular 3\t3.5\n" +
            "You owed 7.5\n" +
            "You earned 3 frequent renter points\n");
    });

});
