import { getAccessTokenFromCookie } from "@/apis/get-token";
import axios from "axios";

export const fetchProfileImageUrls = async (userIds: number[]): Promise<Record<number, string>> => {
    const token = getAccessTokenFromCookie();
    const queryString = userIds.map(id => `userIds=${id}`).join("&");
    const response = await axios.get(`/api/v1/files/profile/urls?${queryString}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });
    return response.data;
  };