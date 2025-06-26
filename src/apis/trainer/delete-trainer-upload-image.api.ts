import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { MULTI_FILE_URL } from "../constants";

export const deleteTrainerInfoImages = async (
  fileId: number,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const res = await axiosInstance.delete(
      `${MULTI_FILE_URL}/${fileId}`,
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
