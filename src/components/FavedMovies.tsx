import { MovieInfo } from '@/utils/apiCalls';
import styled from 'styled-components';
import MoviePoster from './MoviePoster';
import { useState } from 'react';

type FavedMoviesContainerProps = {
  isFavedMoviesOpen: boolean;
};

const FavedMoviesContainer = styled.div<FavedMoviesContainerProps>`
  position: absolute;
  top: ${(props) => (props.isFavedMoviesOpen ? '-50vh' : '-48px')};
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 50vh;
  transition: top 150ms ease-in-out;
  z-index: 2;
  @media (max-width: 768px) {
    top: ${(props) => (props.isFavedMoviesOpen ? '-50vh' : '-100px')};
  }
  filter: drop-shadow(${(props) => props.theme.shadowLevel4});
`;

const FavedMoviesPosters = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 90vw;
  gap: 16px;
  padding: 16px;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${(props) => props.theme.primary};

  @media (max-width: 768px) {
    padding-bottom: 75px;
  }
`;

type FavedMoviesToggleProps = {
  hasFavedMovies: boolean;
  addedFav: boolean;
};

const FavedMoviesToggle = styled.button<FavedMoviesToggleProps>`
  height: 50px;
  min-width: 100px;
  width: fit-content;
  background: ${(props) => props.theme.primary};
  border-radius: 8px 8px 0px 0px;
  padding: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  .material-symbols-outlined {
    font-size: 32px;
    color: ${(props) =>
      props.hasFavedMovies ? props.theme.secondary : props.theme.primaryDarker};

    animation: ${(props) => (props.addedFav ? 'heartBeat 500ms' : 'none')};

    @keyframes heartBeat {
      0% {
        transform: scale(1);
      }
      14% {
        transform: scale(1.3);
        color: ${(props) => props.theme.secondaryLighter};
      }
      28% {
        transform: scale(1);
      }
      42% {
        transform: scale(1.3);
        color: ${(props) => props.theme.secondaryLighter};
      }
      70% {
        transform: scale(1);
      }
    }
  }
`;

const NoFavs = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .material-symbols-outlined {
    font-size: 100px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: ${(props) => props.theme.overlay};
  }
`;

const FavedMoviesToggleLabel = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.primaryLight};
  font-weight: bold;
`;

type FavedMoviesProps = {
  favs: MovieInfo[];
  addedFav: boolean;
  favMovieToggle: (movieInfo: MovieInfo) => void;
  selectMovie: (movieInfo: MovieInfo) => void;
};

const FavedMovies = ({
  favs,
  addedFav,
  favMovieToggle,
  selectMovie,
}: FavedMoviesProps) => {
  const [isFavedMoviesOpen, setIsFavedMoviesOpen] = useState<boolean>(false);

  const toggleFavedMovies = () => {
    setIsFavedMoviesOpen(!isFavedMoviesOpen);
  };
  const hasFavedMovies = () => favs.length > 0;

  return (
    <FavedMoviesContainer isFavedMoviesOpen={isFavedMoviesOpen}>
      <FavedMoviesToggle
        hasFavedMovies={hasFavedMovies()}
        addedFav={addedFav}
        onClick={toggleFavedMovies}
      >
        <span className='material-symbols-outlined'>favorite</span>
        <FavedMoviesToggleLabel>x {favs.length}</FavedMoviesToggleLabel>
      </FavedMoviesToggle>
      <FavedMoviesPosters>
        {favs.length > 0 ? (
          favs.map((movie) => (
            <MoviePoster
              key={`${movie.id}`}
              movieInfo={movie}
              isFaved={true}
              favMovieToggle={favMovieToggle}
              selectMovie={selectMovie}
            />
          ))
        ) : (
          <NoFavs>
            <span className='material-symbols-outlined'>heart_broken</span>
          </NoFavs>
        )}
      </FavedMoviesPosters>
    </FavedMoviesContainer>
  );
};

export default FavedMovies;
