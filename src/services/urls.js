// running frontend & backend in localhost
// must use 'http' and local IP address

const API = "http://192.168.15.6:8080";
// const API = "http://192.168.0.21:8080";
export const VIACEP = `https://viacep.com.br/ws`;

//users
export const LOGIN_API = `${API}/users/login`;
export const USER_REGISTER_API = `${API}/users`;

//locations
export const STATES_API = `${API}/states`;
export const CITIES_API = `${API}/cities`;

//addresses
export const GET_ADDRESS = `${API}/addresses`;
export const UPDATE_ADDRESS = `${API}/addresses`;
export const USER_ADDRESSES = `${API}/addresses/user`;
export const REGISTER_USER_ADDRESS = `${API}/addresses/user`;
export const REMOVE_USER_ADDRESS = `${API}/addresses/user`;

//provider
export const PROVIDER_REGISTER = `${API}/provider/register`;
