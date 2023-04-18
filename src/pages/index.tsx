import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  MovieDetails,
  MovieInfo,
  getFavsFromLocalStorage,
  getFromMovieDatabase,
  getMovieDetails,
  removeFavFromLocalStorage,
  saveFavInLocalStorage,
} from '../utils/apiCalls';
import MovieResults from '@/components/MovieResults';
import FavedMovies from '@/components/FavedMovies';
import SearchArea from '@/components/SearchArea';
import DetailsDialog from '@/components/DetailsDialog';

const Container = styled.div`
  height: 100vh;
  display: grid;
  overflow-x: hidden;
  overflow-y: auto;
  justify-items: center;
  grid-template-areas:
    'title'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  background: ${(props) => props.theme.background};
  overflow: hidden;
`;

type HeaderProps = {
  height: string;
};

const Header = styled.header<HeaderProps>`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${(props) => props.height};
  min-height: 150px;
  transition: height 150ms ease-in-out;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${(props) => props.theme.primaryLight};
  margin: 0;
  padding: 0;
  margin-bottom: 16px;
`;

const Main = styled.main`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: auto;
`;

const Footer = styled.footer`
  grid-area: footer;
  width: 100%;
  height: 0px;
  position: relative;
`;

export default function Home() {
  const [searchEntry, setSearchEntry] = useState<string>('');
  const [headerHeight, setHeaderHeight] = useState<'60vh' | '30vh'>('60vh');
  const [movieList, setMovieList] = useState<MovieInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalSearchPages, setTotalSearchPages] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo>({
    id: 0,
    title: '',
    poster_path: '',
    overview: '',
    release_date: '',
  });
  const [selectedMovieDetails, setSelectedMovieDetails] =
    useState<MovieDetails>({
      homepage: '',
      imdb_id: '',
      tagline: '',
    });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [favs, setFavs] = useState<MovieInfo[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [addedFav, setAddedFav] = useState<boolean>(false);

  useEffect(() => {
    const favsFromLocalStorage = getFavsFromLocalStorage();
    if (favsFromLocalStorage) {
      setFavs(favsFromLocalStorage);
    }
  }, []);

  const onChangeSearchEntry = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchEntry(e.target.value);
  };

  const onKeyPressSearchEntry = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      e.target.blur();
      await onSearch();
    }
  };

  const onSearch = async () => {
    const searchResponse = await getFromMovieDatabase(searchEntry);
    if (searchResponse) {
      if (searchResponse.results.length > 0) {
        setHeaderHeight('30vh');
      } else {
        setHeaderHeight('60vh');
      }
      setMovieList(searchResponse.results);
      setCurrentPage(searchResponse.page);
      setTotalSearchPages(searchResponse.total_pages);
      setHasSearched(true);
      const main = document.querySelector('main');
      if (main) {
        main.scrollTop = 0;
      }
    } else {
      setHeaderHeight('60vh');
    }
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (currentPage < totalSearchPages) {
        onLoadMoreMovies();
      }
    }
  };

  const onLoadMoreMovies = async () => {
    const nextPage = currentPage + 1;
    const searchResponse = await getFromMovieDatabase(searchEntry, nextPage);
    if (searchResponse) {
      const filterExistingMovies = searchResponse.results.filter(
        (movie) =>
          !movieList.some((existingMovie) => existingMovie.id === movie.id)
      );
      setMovieList([...movieList, ...filterExistingMovies]);
      setCurrentPage(searchResponse.page);
    }
  };

  const getIsFaved = (movie: MovieInfo) => {
    return favs.some((fav) => fav.id === movie.id);
  };

  const favMovieToggle = (movieInfo: MovieInfo) => {
    const isFaved = getIsFaved(movieInfo);
    if (isFaved) {
      removeFavFromLocalStorage(movieInfo);
    } else {
      saveFavInLocalStorage(movieInfo);
      setAddedFav(true);
      setTimeout(() => {
        setAddedFav(false);
      }, 500);
    }

    const favsFromLocalStorage = getFavsFromLocalStorage();
    if (favsFromLocalStorage) {
      setFavs(favsFromLocalStorage);
    }
  };

  const selectMovie = (movieInfo: MovieInfo) => {
    setSelectedMovie(movieInfo);
    getSelectedMovieDetails(movieInfo.id);
    setIsOpen(true);
  };

  const getSelectedMovieDetails = async (movieId: number) => {
    const movieDetails = await getMovieDetails(movieId);
    if (movieDetails) {
      setSelectedMovieDetails(movieDetails);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedMovie({
      id: 0,
      title: '',
      poster_path: '',
      overview: '',
      release_date: '',
    });
    setSelectedMovieDetails({
      homepage: '',
      imdb_id: '',
      tagline: '',
    });
  };

  return (
    <>
      <Head>
        <title>Cool Movies</title>
        <meta
          name='description'
          content='Search for movies and add them to your favorites'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Header height={headerHeight}>
          <Title>Cool Movies</Title>
          <SearchArea
            searchEntry={searchEntry}
            onChangeSearchEntry={onChangeSearchEntry}
            onKeyPressSearchEntry={onKeyPressSearchEntry}
            onSearch={onSearch}
          />
        </Header>
        <Main onScroll={onScroll}>
          <MovieResults
            movieList={movieList}
            getIsFaved={getIsFaved}
            favMovieToggle={favMovieToggle}
            selectMovie={selectMovie}
            hasSearched={hasSearched}
          />
        </Main>
        <Footer>
          <FavedMovies
            favs={favs}
            favMovieToggle={favMovieToggle}
            selectMovie={selectMovie}
            addedFav={addedFav}
          />
        </Footer>
      </Container>
      <DetailsDialog
        getIsFaved={getIsFaved}
        favMovieToggle={favMovieToggle}
        movieInfo={selectedMovie}
        movieDetails={selectedMovieDetails}
        isOpen={isOpen}
        closeDialog={closeDialog}
      ></DetailsDialog>
    </>
  );
}
