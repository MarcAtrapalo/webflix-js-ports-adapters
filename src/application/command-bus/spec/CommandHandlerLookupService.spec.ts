import {CommandHandlerLookupService as SUT} from '../CommandHandlerLookupService';
import ICommandHandler from '../CommandHandler';
import Command from '../Command';

const emptyCommandHandler = (): ICommandHandler => {
    return {
        execute: (command: Command) => {}
    };
};

describe('CommandHandlerLookupService', () => {

    it('should accept a list of handlers', () => {
        const creatingSUT = () => {
            new SUT({
                TestCommandHandler: () => {},
                Test2CommandHandler: () => {},
            });
        };
        creatingSUT.should.not.throw();
    });

    it('should not accept a handler not called "CommandHandler"', () => {
        const creatingSUT = () => {
            new SUT({
                TestCommandHandler: () => {},
                Test2: () => {},
            });
        };
        creatingSUT.should.throw(Error);
    });

    it('should return the appropriate handler', () => {
        const testHandler = () => {return 'test handler'};
        const sut = new SUT({
            TestCommandHandler: testHandler,
        });
        sut.lookupCommandHandler('Test').should.equal(testHandler);
    });

    it('should throw if no handler was found for that name', () => {
        const sut = new SUT({
            TestCommandHandler: () => {},
        });
        sut.lookupCommandHandler.bind(this, 'Test2').should.throw(Error);
    });

});