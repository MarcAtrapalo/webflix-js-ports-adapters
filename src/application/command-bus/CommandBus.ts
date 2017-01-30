import Command from './Command';
import * as commandHandlers from '../commands/';

console.log(commandHandlers);

export class CommandBus {

    public execute(command: Command): void {

    }

}

const SingletonCommandBus = new CommandBus();
export default SingletonCommandBus;
