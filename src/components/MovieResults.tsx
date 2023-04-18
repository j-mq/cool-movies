import { MovieInfo } from '@/utils/apiCalls';
import styled from 'styled-components';
import MoviePoster from './MoviePoster';

const MovieResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  gap: 16px;
  flex-wrap: wrap;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    padding-bottom: 100px;
  }
`;

const NoMoviesFound = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.primaryLight};
  opacity: 0;
  animation: fadeIn 150ms ease-in-out forwards;
  animation-delay: 150ms;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

type MovieResultsProps = {
  movieList: MovieInfo[];
  hasSearched: boolean;
  getIsFaved: (movieInfo: MovieInfo) => boolean;
  favMovieToggle: (movieInfo: MovieInfo) => void;
  selectMovie: (movieInfo: MovieInfo) => void;
};

const MovieResults = ({
  movieList,
  hasSearched,
  getIsFaved,
  favMovieToggle,
  selectMovie,
}: MovieResultsProps) => {
  return (
    <MovieResultsContainer>
      {movieList.length > 0
        ? movieList.map((movie) => (
            <MoviePoster
              key={`${movie.id}`}
              movieInfo={movie}
              isFaved={getIsFaved(movie)}
              favMovieToggle={favMovieToggle}
              selectMovie={selectMovie}
            />
          ))
        : hasSearched && <NoMoviesFound>No movies found</NoMoviesFound>}
    </MovieResultsContainer>
  );
};

export default MovieResults;
