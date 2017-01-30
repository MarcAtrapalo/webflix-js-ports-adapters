import IMovieRepository from '../repository-ports/IMovieRepository';
import Movie from '../../domain/model/Movie';
import MovieFactory, {IMovieType} from '../../domain/services/MovieFactory';
import Command from '../command-bus/Command';
import CommandHandler from '../command-bus/CommandHandler';

export interface RentMovieCommand extends Command {
    title: string;
    type: string;
    movieRepository: IMovieRepository;
}

export default class RentMovieCommandHandler implements CommandHandler {

    public execute(command: RentMovieCommand): void {
        // let movieType = this.getMovieType(command.type);
        // let movie = MovieFactory.createMovie(command.title, movieType);
        // command.movieRepository.add(movie);
    }

}
