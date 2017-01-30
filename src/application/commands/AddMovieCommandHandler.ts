import IMovieRepository from '../../infrastructure/repositories/IMovieRepository';
import Movie from '../../domain/model/Movie';
import MovieFactory, {IMovieType} from '../../domain/services/MovieFactory';
import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';

export interface AddMovieCommand extends Command {
    title: string;
    type: string;
    movieRepository: IMovieRepository;
}

export default class AddMovieCommandHandler implements CommandHandler {

    private getMovieType(type: string): IMovieType {
        switch (type) {
            case 'new_release':
                return IMovieType.NEW_RELEASE;
            case 'regular':
                return IMovieType.REGULAR;
            case 'children':
                return IMovieType.CHILDRENS;
            default:
                throw new Error('Unexpected movie type');
        }
    }

    public execute(command: AddMovieCommand): void {
        let movieType = this.getMovieType(command.type);
        let movie = MovieFactory.createMovie(command.title, movieType);
        command.movieRepository.add(movie);
    }

}
