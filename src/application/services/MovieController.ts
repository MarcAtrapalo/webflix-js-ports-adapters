import InMemoryMovieRepository from '../../infrastructure/repositories/InMemoryMovieRepository';
import AddMovieUseCase from './AddMovieUseCase';

export interface IAddMovieRequest {
    title: string;
    type: string;
}

class MovieController {

    addMovie(request: IAddMovieRequest) {
        let useCase = new AddMovieUseCase(InMemoryMovieRepository);
        useCase.execute(request.title, request.type);
    }

}

export default MovieController;
