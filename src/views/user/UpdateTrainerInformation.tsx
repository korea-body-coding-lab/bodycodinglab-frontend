/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import Header from '../header/Header';
import { editBottomButtonStyle, editButtonStyle, formInfomationTitleStyle, formInformationStyle, formLabelStyle, formSectionInformationStyle, formSpanStyle, inputStyle, inputUpdateWrapperStyle, layoutStyle, mainStyle, mainTitleStyle } from './user.style';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { genderToKr } from '@/utils/gender.map';
import { UpdateTrainerInfoRequestDto } from '@/dtos/user/request/update-trainer-info.request.dto';
import { validateUpdateTrainerInfoForm } from '@/utils/update-user-information.valid';
import { UpdateTrainerInformationRequest } from '@/apis/user/update-trainer-information.api';
import { useUserStore } from '@/stores/user.store';

function UpdateTrainerInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [form, setForm] = useState({
    name: ""
  });
  const path = location.pathname;
  const trainer = location.state?.trainer;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;
  const setName = useUserStore((state) => state.setName);
  
  if (!trainer) return <div>잘못된 접근입니다</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditClick = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateUpdateTrainerInfoForm(form);

    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (form.name.trim() === '') {
      alert('변경할 항목이 없습니다.');
      return;
    }

    const dto: UpdateTrainerInfoRequestDto = { name: form.name };

    try {
      const response = await UpdateTrainerInformationRequest(dto, accessToken);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      if (form.name.trim() !== '') {
        setName(form.name);
      }

      alert('회원 정보 수정이 완료되었습니다.');
      navigate('/users/trainers/me');
    } catch(e) {
      console.log('회원 정보 수정 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }

  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={layoutStyle}>
        <MyPageSidebar />
        <div css={mainStyle}>
          <h2 css={mainTitleStyle}>{menuTitle}</h2>
            <div css={formSectionInformationStyle}>
              <button css={editButtonStyle} onClick={handleEditClick}>수정 완료</button>
              <h2 css={formInfomationTitleStyle}>기본 정보</h2>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>아이디</label>
                <span css={formSpanStyle}>{trainer.username}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>성명</label>
                <div css={inputUpdateWrapperStyle}>
                  <input
                    type="text"
                    name='name'
                    value={form.name}
                    onChange={handleInputChange}
                    css={inputStyle}
                  />
                </div>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>생년월일</label>
                <span css={formSpanStyle}>{trainer.birthdate}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>성별</label>
                <span css={formSpanStyle}>{genderToKr[trainer.gender]}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>휴대폰번호</label>
                <span css={formSpanStyle}>{trainer.phone}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>이메일</label>
                <span css={formSpanStyle}>{trainer.email}</span>
              </div>
            </div>
            {/* <div css={formSectionInformationStyle}>
              <h2 css={formInfomationTitleStyle}>선택 정보</h2>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>프로필 사진</label>
                <div css={inputUpdateWrapperStyle}>
                  <input
                    type="file"
                    name='profile'
                    onChange={handleProfileChange}
                    css={inputStyle}
                  />
                </div>
              </div>
            </div> */}
            <button css={editBottomButtonStyle} onClick={handleEditClick}>수정 완료</button>
        </div>
      </div>
    </>
  );
}

export default UpdateTrainerInformation;