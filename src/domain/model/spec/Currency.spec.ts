import Currency from '../valueObjects/Currency';

describe('Currency', () => {

    let currency: Currency;

    before(() => {
        currency = new Currency('EUR');
    });

    it('should be able to have a correct ISO code', () => {
        currency.isoCode = 'BRP';
        currency.isoCode.should.equal('BRP');
    });

    it('should disallow ISO codes of less than 3 letters', () => {
        const setter = () => {currency.isoCode = 'AB'};
        setter.should.throw(Error);
    });

    it('should disallow ISO codes of more than 3 letters', () => {
        const setter = () => {currency.isoCode = 'ABCD'};
        setter.should.throw(Error);
    });

    it('should disallow ISO codes with a non letter character', () => {
        const setter = () => {currency.isoCode = 'AB2'};
        setter.should.throw(Error);
    });

});
