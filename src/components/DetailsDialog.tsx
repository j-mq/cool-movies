import { MovieDetails, MovieInfo } from '@/utils/apiCalls';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import MoviePoster from './MoviePoster';

const DetailsDialogContainer = styled.dialog`
  width: 100%;
  max-width: 600px;
  height: fit-content;
  max-height: 66vh;
  border: none;
  border-radius: 8px;
  ::backdrop {
    background: ${(props) => props.theme.overlayDark};
  }
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadowLevel3};
  background: ${(props) => props.theme.primaryLight};
  opacity: 0;
  animation: fadeIn 150ms ease-in-out forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const DialogContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transition: all 150ms ease-in-out;
`;

const CloseDialog = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .material-symbols-outlined {
    font-size: 24px;
    color: ${(props) => props.theme.primaryDark};
  }
`;

const MovieData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 0px 16px;
  height: 100%;
  max-height: 60vh;
  overflow-y: auto;
  padding-bottom: 16px;
  gap: 8px;

  color: ${(props) => props.theme.primaryDarkest};
`;

const MovieTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: inherit;
`;

const MovieReleaseDate = styled.div`
  font-size: 16px;
  color: inherit;
`;
const MovieTagline = styled.div`
  font-size: 16px;
  font-style: italic;
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

const MovieOverview = styled.div`
  font-size: 14px;
  color: inherit;
`;

const MovieLink = styled.a`
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
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

type DetailsDialogProps = {
  movieInfo: MovieInfo;
  movieDetails: MovieDetails;
  isOpen: boolean;
  getIsFaved: (movieInfo: MovieInfo) => boolean;
  favMovieToggle: (movieInfo: MovieInfo) => void;
  closeDialog: () => void;
};

const DetailsDialog = ({
  movieInfo,
  movieDetails,
  isOpen,
  getIsFaved,
  favMovieToggle,
  closeDialog,
}: DetailsDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.removeAttribute('open');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      openDialog();
    }
  }, [isOpen]);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const onCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      closeDialog();
    }
  };

  const getReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate);
    return `Released on ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;
  };

  return (
    <DetailsDialogContainer ref={dialogRef} onClick={onCloseDialog}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <MoviePoster
          movieInfo={movieInfo}
          isFaved={getIsFaved(movieInfo)}
          favMovieToggle={favMovieToggle}
          noRandomDelay
        />
        <CloseDialog onClick={onCloseDialog}>
          <span className='material-symbols-outlined'>close</span>
        </CloseDialog>
        <MovieData>
          <MovieTitle>{movieInfo.title}</MovieTitle>
          <MovieReleaseDate>
            {getReleaseDate(movieInfo.release_date)}
          </MovieReleaseDate>
          <MovieTagline>{movieDetails.tagline}</MovieTagline>
          <MovieOverview>{movieInfo.overview}</MovieOverview>
          {movieDetails.homepage && (
            <MovieLink href={movieDetails.homepage} target='_blank'>
              Homepage
            </MovieLink>
          )}
          {movieDetails.imdb_id && (
            <MovieLink
              href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
              target='_blank'
            >
              IMDB Page
            </MovieLink>
          )}
        </MovieData>
      </DialogContent>
    </DetailsDialogContainer>
  );
};

export default DetailsDialog;
