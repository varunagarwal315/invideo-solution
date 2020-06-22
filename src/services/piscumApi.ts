/* eslint-disable */
import { AxiosResponse, AxiosError } from 'axios';
import { IPiscumRes } from '@/interfaces/IPiscumResponse';
import api from './baseApi';

const getImagesFromPiscumApi = (limit: number, page: number): Promise<AxiosResponse<IPiscumRes[]>> => {
  return api().get(`/list?limit=${limit}&page=${page}`);
};

export {
  getImagesFromPiscumApi,
  AxiosError
};
