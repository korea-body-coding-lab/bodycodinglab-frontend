/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import Header from '../header/Header'
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { editButtonStyle, formInfomationTitleStyle, formInformationStyle, formLabelStyle, formSectionInformationStyle, formSpanStyle, layoutStyle, mainStyle, mainTitleStyle } from './user.style';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { GetMemberInformationRequest } from '@/apis/user/get-member-information.api';
import { GetMemberInfoResponseDto } from '@/dtos/user/response/get-member-info.response.dto';
import { genderToKr } from '@/utils/gender.map';

function GetMemberInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [member, setMember] = useState<GetMemberInfoResponseDto>({
    username: '',
    name: '',
    birthdate: '',
    gender: '',
    phone: '',
    email: '',
    memberAddress: ''
  });
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;

  const handleEditClick = () => {
    navigate('/users/members/me/setting', {
      state: {
        member,
      }
    });
  }

  const fetchInformation = async () => {
    if (!accessToken) return;
  
    try {
      const response = await GetMemberInformationRequest(accessToken);
      const { code, message, data } = response;
  
      if (code === 'SU' && data) {
        setMember(data);
        return;
      } else {
        console.error('개인 정보 불러오기 실패: ', message);
        alert('개인 정보 불러오기 실패');
      }    
    } catch (e) {
      console.log('개인 정보 조회 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  useEffect(() => {
    fetchInformation();
  }, []);

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
              <button css={editButtonStyle} onClick={handleEditClick}>수정하기</button>
              <h2 css={formInfomationTitleStyle}>기본 정보</h2>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>아이디</label>
                <span css={formSpanStyle}>{member.username}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>성명</label>
                <span css={formSpanStyle}>{member.name}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>생년월일</label>
                <span css={formSpanStyle}>{member.birthdate}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>성별</label>
                <span css={formSpanStyle}>{genderToKr[member.gender]}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>휴대폰번호</label>
                <span css={formSpanStyle}>{member.phone}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>이메일</label>
                <span css={formSpanStyle}>{member.email}</span>
              </div>
            </div>
            <div css={formSectionInformationStyle}>
              <h2 css={formInfomationTitleStyle}>추가 정보</h2>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>주소</label>
                <span css={formSpanStyle}>{member.memberAddress}</span>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default GetMemberInformation;