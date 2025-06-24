import ResponseDto from "@/dtos/response.dto";
import axios, { AxiosError, AxiosResponse } from "axios";


export const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_DOMAIN || "http://localhost:8080",
  timeout: 5000, 
});


export const responseSuccessHandler = <T = any>(response: AxiosResponse<ResponseDto<T>>) => {
  return response.data; 
}


export const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
  if (error?.response?.status === 403) {
    alert('접근 권한이 없습니다.');
    window.location.href = '/';
  }

  if (!error.response) return { code: 'NETWORK_ERROR', message: '네트워크 오류', data: null };
  return error.response.data; 
}


export const bearerAuthorization = (accessToken: string) => ({
  headers: { 'Authorization': `Bearer ${accessToken}` }
}); 
