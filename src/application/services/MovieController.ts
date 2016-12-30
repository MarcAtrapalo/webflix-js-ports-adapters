import MovieRepository from '../../infrastructure/repositories/MovieRepository';
import AddMovieUseCase from './AddMovieUseCase';

export interface IAddMovieRequest {
    title: string;
    type: string;
}

class MovieController {

    addMovie(request: IAddMovieRequest) {
        let useCase = new AddMovieUseCase(MovieRepository);
        useCase.execute(request.title, request.type);
    }

}

export default MovieController;
