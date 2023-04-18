import { MovieInfo } from '@/utils/apiCalls';
import styled from 'styled-components';

type MoviePosterContainerProps = {
  randomDelay: number;
};

const MoviePosterContainer = styled.div<MoviePosterContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: ${(props) => props.theme.shadowLevel2};
  opacity: 0;
  transform: translateY(-50px);
  animation: slideDown 150ms ease-in-out forwards;

  animation-delay: ${(props) => props.randomDelay}ms;

  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MovieClickableArea = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  :disabled {
    cursor: default;
  }
  width: 200px;
  height: 300px;
  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
  }
`;

const MovieImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NoPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
  background: ${(props) => props.theme.primaryDarker};
  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    font-size: 50px;
    color: ${(props) => props.theme.primaryDarkest};
  }
`;

const MovieInfoContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.overlay};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  height: 20%;
  display: flex;
`;

const MovieTitle = styled.h3`
  color: ${(props) => props.theme.primaryLight};
  font-size: 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0;
  margin: 0;
`;

type FavButtonProps = {
  isFaved?: boolean;
};

const FavButton = styled.button<FavButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  z-index: 1;
  transition: transform 150ms ease-in-out;

  :active {
    transform: scale(0.9);
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    ${(props) =>
      props.isFaved ? `filter: drop-shadow(${props.theme.shadowLevel1});` : ''}
    font-size: 32px;
    color: ${(props) =>
      props.isFaved ? props.theme.secondary : props.theme.primaryDarker};
  }

  @media (min-width: 768px) {
    :hover {
      transform: scale(1.1);
    }
    :hover .material-symbols-outlined {
      color: ${(props) => props.theme.secondaryLighter};
    }
    :active .material-symbols-outlined {
      filter: none:
    }
    :active:hover {
      transform: scale(0.9);
    }
  }
`;

type MoviePosterProps = {
  movieInfo: MovieInfo;
  isFaved: boolean;
  noRandomDelay?: boolean;
  favMovieToggle: (movieInfo: MovieInfo) => void;
  selectMovie?: (movieInfo: MovieInfo) => void;
};

const MoviePoster = ({
  movieInfo,
  isFaved,
  noRandomDelay,
  favMovieToggle,
  selectMovie,
}: MoviePosterProps) => {
  const delay = Math.floor(Math.random() * 150) + 150;
  const randomDelay = noRandomDelay ? 0 : delay;

  return (
    <MoviePosterContainer randomDelay={randomDelay}>
      <MovieInfoContainer>
        <MovieTitle>{movieInfo.title}</MovieTitle>
        <FavButton isFaved={isFaved} onClick={() => favMovieToggle(movieInfo)}>
          <span className='material-symbols-outlined'>favorite</span>
        </FavButton>
      </MovieInfoContainer>
      <MovieClickableArea
        onClick={() => selectMovie && selectMovie(movieInfo)}
        disabled={selectMovie ? false : true}
      >
        {movieInfo.poster_path ? (
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
            alt={movieInfo.title}
          />
        ) : (
          <NoPoster>
            <span className='material-symbols-outlined'>movie</span>
          </NoPoster>
        )}
      </MovieClickableArea>
    </MoviePosterContainer>
  );
};

export default MoviePoster;
