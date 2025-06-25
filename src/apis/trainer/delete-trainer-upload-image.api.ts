import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";

export const deleteTrainerInfoImages = async (
  fileId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const res = await axiosInstance.delete(
      `/api/v1/files/multi/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return responseSuccessHandler(res);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
