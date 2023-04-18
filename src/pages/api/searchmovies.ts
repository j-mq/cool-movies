import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const key = process.env.TMDP_KEY;
  const searchEntry = req.query.searchEntry;
  const page = req.query.page;

  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchEntry}&page=${page}`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json(error.response.data);
    });
};

export default handler;
