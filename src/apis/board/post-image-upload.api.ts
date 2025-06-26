import axios from "axios";
import { getAccessTokenFromCookie } from "../get-token";

const uploadImages = async (files: File[], targetId: number, targetType: 'POST'): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('targetId', String(targetId));
    formData.append('targetType', targetType);
  
    const response = await axios.post('/api/v1/files/multi', formData, {
      headers: {
        Authorization: `Bearer ${getAccessTokenFromCookie()}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  
    return response.data.data.map((file: { url: string }) => file.url);
  };
  