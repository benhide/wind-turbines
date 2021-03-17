import axios from 'axios';

import { ITurbineResponse } from 'app/index';
export async function getRequest(): Promise<ITurbineResponse[]> {
  const url = 'https://run.mocky.io/v3/6a13fe7e-840c-4d82-b58f-c737139f0e55' as const;

  try {
    const response = await axios.get<ITurbineResponse[]>(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
