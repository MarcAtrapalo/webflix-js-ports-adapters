import InMemoryMovieRepository from '../../infrastructure/repositories/InMemoryMovieRepository';
import {AddMovieCommand} from '../../application/commands/AddMovieCommandHandler';
import CommandBus from '../../application/command-bus/CommandBus';

export interface IAddMovieRequest {
    title: string;
    type: string;
}

export default class MovieController {

    addMovie(request: IAddMovieRequest) {
        const command: AddMovieCommand = {
            meta: {
                commandType: 'AddMovie',
            },
            title: request.title,
            type: request.type,
            movieRepository: InMemoryMovieRepository,
        };

        CommandBus.execute(command);
    }

}
