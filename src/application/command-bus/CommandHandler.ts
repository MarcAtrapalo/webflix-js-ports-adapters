import Command from './Command';

interface ICommandHandler {
    execute: (command: Command) => void;
}

export default ICommandHandler;
    