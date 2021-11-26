import { createAsyncAction } from 'typesafe-actions';

export const getFootballStats = createAsyncAction(
  'GET_FOOTBALL_STATS',
  'GET_FOOTBALL_STATS_SUCCESSES',
  'GET_FOOTBALL_STATS_FAILED',
)<any, any, any>();
