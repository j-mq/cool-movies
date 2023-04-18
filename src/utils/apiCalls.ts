import axios from 'axios';

export type MovieDetails = {
  homepage: string;
  imdb_id: string;
  tagline: string;
};

export type MovieInfo = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
};

export type MovieSearchResponse = {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
};

export const getFromMovieDatabase = async (
  searchEntry: string,
  page: number = 1
): Promise<MovieSearchResponse> => {
  const data = await axios
    .get(`/api/searchmovies`, {
      params: { searchEntry, page },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    })
    .finally(() => {});

  return data as unknown as Promise<MovieSearchResponse>;
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const data = await axios
    .get(`/api/getmoviebyid`, {
      params: { movieId },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    })
    .finally(() => {});

  return data as unknown as Promise<MovieDetails>;
};

//TODO: Save in a DB
export const saveFavInLocalStorage = (movieInfo: MovieInfo): MovieInfo[] => {
  const favs = getFavsFromLocalStorage();
  favs.push(movieInfo);
  localStorage.setItem('favs', JSON.stringify(favs));
  return favs;
};

export const removeFavFromLocalStorage = (
  movieInfo: MovieInfo
): MovieInfo[] => {
  const favs = getFavsFromLocalStorage();
  const newFavs = favs.filter((fav) => fav.id !== movieInfo.id);
  localStorage.setItem('favs', JSON.stringify(newFavs));
  return newFavs;
};

export const getFavsFromLocalStorage = (): MovieInfo[] => {
  const favs = localStorage.getItem('favs');
  if (favs) {
    return JSON.parse(favs);
  }
  return [];
};
