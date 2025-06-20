/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import Header from '../header/Header'
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { editBottomButtonStyle, editButtonStyle, formInfomationTitleStyle, formInfomationWarningTitleStyle, formInformationStyle, formLabelStyle, formSectionInformationStyle, formSpanStyle, layoutStyle, mainStyle, mainTitleStyle } from './user.style';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { genderToKr } from '@/utils/gender.map';
import { GetTrainerInfoResponseDto } from '@/dtos/user/response/get-trainer-info.response.dto';
import { GetTrainerInformationRequest } from '@/apis/user/get-trainer-information.api';
import { trainerStatusMap } from '@/utils/trainer-status.map';

function GetTrainerInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [trainer, setTrainer] = useState<GetTrainerInfoResponseDto>({
    trainerId: 0,
    username: '',
    name: '',
    birthdate: '',
    gender: '',
    phone: '',
    email: '',
    jobAddress: '',
    attachmentFileUrl: '',
    status: '',
  });
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;

  const handleEditClick = () => {
    navigate('/users/trainers/me/setting', {
      state: {
        trainer,
      }
    });
  }

  const fetchInformation = async () => {
    if (!accessToken) return;
  
    try {
      const response = await GetTrainerInformationRequest(accessToken);
      const { code, message, data } = response;
  
      if (code === 'SU' && data) {
        console.log(trainer.attachmentFileUrl);
        setTrainer(data);
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
                <label css={formLabelStyle}>트레이너 번호</label>
                <span css={formSpanStyle}>{trainer.trainerId}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>아이디</label>
                <span css={formSpanStyle}>{trainer.username}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>성명</label>
                <span css={formSpanStyle}>{trainer.name}</span>
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
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>승인/거부</label>
                <span css={formSpanStyle}>{trainerStatusMap[trainer.status]}</span>
              </div>
            </div>
            <div css={formSectionInformationStyle}>
              <h2 css={formInfomationTitleStyle}>추가 정보</h2>
              <p css={formInfomationWarningTitleStyle}>근무지 주소 변경은 관리자에게 문의해 주세요.</p>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>근무지 주소</label>
                <span css={formSpanStyle}>{trainer.jobAddress}</span>
              </div>
              <div css={formInformationStyle}>
                <label css={formLabelStyle}>첨부파일(계약서 등)</label>
                {trainer.attachmentFileUrl ? (
                  <a
                    href={`http://localhost:8080${trainer.attachmentFileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    css={formSpanStyle}
                  >
                    첨부파일 다운로드
                  </a>
                ) : (
                  <span css={formSpanStyle}>첨부된 파일이 없습니다.</span>
                )}
              </div>
            </div>
            <button css={editBottomButtonStyle} onClick={handleEditClick}>수정하기</button>
        </div>
      </div>
    </>
  );
}

export default GetTrainerInformation;