import IMovieRepository from '../repository-ports/IMovieRepository';
import MovieFactory, {IMovieType} from '../../domain/services/MovieFactory';
import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';
import ApplicationException from "../ApplicationException";

export interface AddMovieCommand extends Command {
    title: string;
    type: string;
    movieRepository: IMovieRepository;
}

export class AddMovieCommandHandler implements CommandHandler {

    private getMovieType(type: string): IMovieType {
        switch (type) {
            case 'new_release':
                return IMovieType.NEW_RELEASE;
            case 'regular':
                return IMovieType.REGULAR;
            case 'children':
                return IMovieType.CHILDRENS;
            default:
                throw new ApplicationException('Unexpected movie type');
        }
    }

    public execute(command: AddMovieCommand): void {
        let movieType = this.getMovieType(command.type);
        let movie = MovieFactory.createMovie(command.title, movieType);
        command.movieRepository.add(movie);
    }

}

const addMovie = new AddMovieCommandHandler();
export default addMovie;
