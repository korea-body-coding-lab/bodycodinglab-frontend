/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useState } from 'react'
import { profileButtonGroup, profileContainer, profileDelete, profileInput, profileTitle, profileUpload } from '../sidebar/sidebar.style';
import { useCookies } from 'react-cookie';
import { useUserStore } from '@/stores/user.store';
import { DeleteProfileImageRequest } from '@/apis/user/delete-profile-image';
import { UpdateProfileImageRequest } from '@/apis/user/update-profile-image';

function UpdateProfileImage() {
  const [cookies] = useCookies(['accessToken']);
  const [profile, setProfile] = useState<File | null>(null);
  const accessToken = cookies.accessToken;
  const user = useUserStore((state) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!profile) return alert('프로필 이미지를 첨부해 주세요');

    const formData = new FormData();
    formData.append('profile', profile);

    try {
      const response = await UpdateProfileImageRequest (formData, accessToken);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('프로필 이미지가 변경되었습니다.');
      window.opener.location.reload();
      window.close();

    } catch (e) {
      console.log('프로필 이미지 변경 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  const handleDelete = async () => {
    const check = window.confirm('정말 프로필 이미지를 제거하시겠습니까?');
    if (!check) return;

    try {
      const response = await DeleteProfileImageRequest(accessToken);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('프로필 이미지가 제거되었습니다.');
      window.opener.location.reload();
      window.close();
    } catch (e) {
      console.log('프로필 이미지 제거 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  return (
    <div css={profileContainer}>
      <h2 css={profileTitle}>프로필 이미지 변경</h2>

      <input type='file' name='profile' onChange={handleChange} css={profileInput} />

      <div css={profileButtonGroup}>
        <button onClick={handleUpload} css={profileUpload}>
          업로드
        </button>
        <button onClick={handleDelete} css={profileDelete}>
          제거하기
        </button>
      </div>
    </div>
  );
}

export default UpdateProfileImage;