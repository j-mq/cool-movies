import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const key = process.env.TMDP_KEY;
  const movieId = req.query.movieId;

  return axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json(error.response.data);
    });
};

export default handler;
