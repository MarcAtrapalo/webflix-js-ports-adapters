import Command from './Command';
import CommandHandler from './CommandHandler';
import CommandHandlerLookupServiceInstance, {CommandHandlerLookupService} from './CommandHandlerLookupService';

export class CommandBus {

    constructor(private service: CommandHandlerLookupService) {}

    public execute(command: Command): void {
        const commandName = command.meta.commandType;
        const commandHandler = <CommandHandler>this.service.lookupCommandHandler(commandName);
        commandHandler.execute(command);
    }

}

const SingletonCommandBus = new CommandBus(CommandHandlerLookupServiceInstance);
export default SingletonCommandBus;
