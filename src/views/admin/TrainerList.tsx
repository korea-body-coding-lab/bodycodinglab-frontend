/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import Header from '../header/Header';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { layoutStyle, mainStyle, mainTitleStyle, tableStyle, tbodyStyle, theadStyle } from './admin.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { GetAllTrainersResponseDto } from '@/dtos/admin/response/get-all-trainers.response.dto';
import { getAllTrainersRequest } from '@/apis/admin/get-all-trainers.api';
import { trainerStatusMap } from '@/utils/trainer-status.map';
import { useCookies } from 'react-cookie';
import TrainerModal from './TrainerModal';
import { GetTrainerDetailResponseDto } from '@/dtos/admin/response/get-trainer-detail-response.dto';
import { getTrainerDetailRequest } from '@/apis/admin/get-trainer-detail.api';

function TrainerList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trainerList, setTrainerList] = useState<GetAllTrainersResponseDto[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<GetTrainerDetailResponseDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const [cookies] = useCookies(['accessToken']);

  const fetchTrainers = async () => {
    const accessToken = cookies.accessToken;

    if (!accessToken) return;

    try {
      const response = await getAllTrainersRequest(accessToken);
      const { code, message, data } = response;

      if (code === 'SU' && data) {
        setTrainerList(data);
      } else {
        console.error('트레이너 목록 불러오기 실패: ', message);
        alert('트레이너 목록 불러오기 실패');
      }
    } catch (e) {
      console.error('트레이너 목록 요청 중 에러 발생:', e);
      alert('트레이너 목록 요청 중 문제가 발생했습니다.');
    }
  };

  const handleDetailClick = async (trainerId: number) => {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/auth/login');
      return;
    }

    try {
      const response = await getTrainerDetailRequest(trainerId, accessToken);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      setSelectedTrainer(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('상세 조회 실패:', error);
      alert('상세 조회 실패');
    }
  };

  useEffect(() => {
    fetchTrainers();
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
          <table css={tableStyle}>
            <thead css={theadStyle}>
              <tr>
                <th>순번</th>
                <th>아이디</th>
                <th>성명</th>
                <th>생년월일</th>
                <th>근무지</th>
                <th>가입일</th>
                <th>상태</th>
                <th>상세 조회</th>
              </tr>
            </thead>
            <tbody css={tbodyStyle}>
              {trainerList.map((trainer, index) => (
                <tr key={trainer.trainerId}>
                  <td>{index + 1}</td>
                  <td>{trainer.username}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.birthdate}</td>
                  <td>{trainer.jobAddress}</td>
                  <td>{trainer.createdAt}</td>
                  <td>{trainerStatusMap[trainer.status]}</td>
                  <td>
                    <button 
                      className="detail"
                      onClick={() => handleDetailClick(trainer.trainerId)}
                    >
                      조회
                    </button>
                </td>
              </tr>
        ))}
            </tbody>
          </table>

          {isModalOpen && selectedTrainer && (
            <TrainerModal
              trainer={selectedTrainer}
              onClose={() => setIsModalOpen(false)}
              onStatusUpdated={() => {
                setIsModalOpen(false);
                setSelectedTrainer(null);
                fetchTrainers();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TrainerList;