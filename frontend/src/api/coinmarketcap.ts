import axios from 'axios';

const API_KEY = '841340f1-1e7e-4da3-8e0d-4033722e2adb';
const apiCoinMarketCap = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/',
  headers: {
    Accepts: 'application/json',
    'Content-Type': 'application/json',
    'X-CMC_PRO_API_KEY': API_KEY
  }
});

interface FiatMapQueryGet {
  start: number;
  limit: number;
  sort: string;
  include_metals: boolean;
}

interface TokenMapQueryGet {
  listing_status: string;
  start: number;
  limit: number;
  sort: string;
  symbol: string;
  aux: string;
}

export async function getFiatMap(
  params: Partial<FiatMapQueryGet> = {
    start: 1,
    sort: 'id',
    include_metals: false
  }
) {
  const response = await apiCoinMarketCap.get('/fiat/map', {
    params
  });
  return response.data;
}

export async function getTokenMap(
  params: Partial<TokenMapQueryGet> = {
    listing_status: 'active',
    start: 1,
    sort: 'id',
    aux: 'first_historical_data,last_historical_data,is_active'
  }
) {
  const response = await apiCoinMarketCap.get('/cryptocurrency/map', {
    params
  });
  return response.data;
}
