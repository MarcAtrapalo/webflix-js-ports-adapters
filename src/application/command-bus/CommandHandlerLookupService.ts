import * as commandHandlers from '../commands/index';
import ICommandHandler from './CommandHandler';

export class CommandHandlerLookupService {

    private commandHandlers: any;

    private static REG_EXP = /(.+)CommandHandler$/;
    private static NAME_CAPTURE_GROUP = 1;

    constructor(commandHandlers: any) {
        this.commandHandlers = Object.keys(commandHandlers).reduce((handlers: any, commandHandlerName: string) => {
            if (!this.isValidName(commandHandlerName)) {
                throw new Error('Invalid Command Handler name: "' + commandHandlerName
                    + '". Names must be unique and end in "CommandHandler"');
            }
            return {
                ...handlers,
                [this.getNamePart(commandHandlerName)]: commandHandlers[commandHandlerName],
            };
        }, {});
    }

    private getNamePart(name: string): string {
        const result = CommandHandlerLookupService.REG_EXP.exec(name);
        return result[CommandHandlerLookupService.NAME_CAPTURE_GROUP];
    }

    private isValidName(name: string): boolean {
        const finishesCorrectly = CommandHandlerLookupService.REG_EXP.test(name);
        const isUnique = typeof this.commandHandlers === 'undefined' ||
            typeof this.commandHandlers[name] === 'undefined';
        return finishesCorrectly && isUnique;
    }

    public lookupCommandHandler(type: string): any {
        const commandHandlerName = Object.keys(this.commandHandlers).filter(
            (name: string) => name === type
        )[0];
        return this.commandHandlers[commandHandlerName];
    }
}

const CommandHandlerLookupServiceSingleton = new CommandHandlerLookupService(commandHandlers);
export default CommandHandlerLookupServiceSingleton;
