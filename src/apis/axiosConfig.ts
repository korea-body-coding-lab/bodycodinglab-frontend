//# Axios 인스턴스 및 공통 설정

import axios, { AxiosError, AxiosResponse } from "axios";
import { ResponseDto } from "../dtos/response";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_DOMAIN || "http://localhost:8080",
  timeout: 5000, 
});


// 1) 성공
export const responseSuccessHandler = <T = any>(response: AxiosResponse<ResponseDto<T>>) => {
  return response.data; 
}

// 2) 실패
export const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
  if (!error.response) return { code: 'NETWORK_ERROR', message: '네트워크 오류', data: null };
  return error.response.data; 
}

//& function: Authorization Bearer 헤더 //

export const bearerAuthorization = (accessToken: string) => ({
  headers: { 'Authorization': `Bearer ${accessToken}` }
}); 

//? EX) axios.get(URL, bearerAuthorization(token));