/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import Header from '../header/Header';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { filterButtonContainer, filterButtonsLeft, filterButtonStyle, layoutStyle, mainStyle, mainTitleStyle, paginationButtonStyle, paginationWrapper, tableStyle, tbodyStyle, theadStyle } from './admin.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { GetAllTrainersResponseDto } from '@/dtos/admin/response/get-all-trainers.response.dto';
import { getAllTrainersRequest } from '@/apis/admin/get-all-trainers.api';
import { useCookies } from 'react-cookie';
import TrainerModal from './TrainerModal';
import { GetTrainerDetailResponseDto } from '@/dtos/admin/response/get-trainer-detail-response.dto';
import { getTrainerDetailRequest } from '@/apis/admin/get-trainer-detail.api';
import { trainerStatusToEn, trainerStatusToKr } from '@/utils/trainer-status.map';

function TrainerList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trainers, setTrainers] = useState<GetAllTrainersResponseDto[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState<GetTrainerDetailResponseDto | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const maxPageButtons = 5;
  const startPage = Math.floor(page / maxPageButtons) * maxPageButtons;
  const endPage = Math.min(startPage + maxPageButtons, totalPages);

  useEffect(() => {
    fetchTrainers();
  }, [page, selectedStatus]);

  const fetchTrainers = async () => {
    const accessToken = cookies.accessToken;

    if (!accessToken) return;

    try {
      const response = await getAllTrainersRequest(page, 10, trainerStatusToEn[selectedStatus], accessToken);
      const { code, message, data } = response;

      if (code === 'SU' && data) {
        setTrainers(data.content);
        setTotalPages(data.totalPages);
      } else {
        setTrainers([]);
        console.error('트레이너 목록 불러오기 실패: ', message);
        alert('트레이너 목록 불러오기 실패');
      }
    } catch (e) {
      console.error('트레이너 목록 요청 중 에러 발생:', e);
      alert('트레이너 목록 요청 중 문제가 발생했습니다.');
    }
  };

  const handlerFilterChange = (label: string) => {
    setSelectedStatus(label);
    setPage(0);
  }

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
  

  return (
    <>
      <div>
        <Header />
      </div>
      <div css={layoutStyle}>
        <MyPageSidebar />
        <div css={mainStyle}>
          <h2 css={mainTitleStyle}>{menuTitle}</h2>
          <div css={filterButtonContainer}>
            <div css={filterButtonsLeft}>
              {['전체', '대기', '승인', '거부'].map((label) => (
                <button
                  key={label}
                  css={filterButtonStyle(selectedStatus === label)}
                  onClick={() => handlerFilterChange(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
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
              {Array.isArray(trainers) && trainers.map((trainer, index) => (
                <tr key={trainer.trainerId}>
                  <td>{page * 10 + index + 1}</td>
                  <td>{trainer.username}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.birthdate}</td>
                  <td>{trainer.jobAddress}</td>
                  <td>{trainer.createdAt}</td>
                  <td>{trainerStatusToKr[trainer.status]}</td>
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

          {totalPages > 0 && (
            <div css={paginationWrapper}>
              {startPage > 0 && (
                <button onClick={() => setPage(startPage - 1)} css={paginationButtonStyle(false)}>
                  &lt;
                </button>
              )}

              {Array.from({ length: endPage - startPage }, (_, i) => {
                const pageIndex = startPage + i;
                return (
                  <button
                    key={pageIndex}
                    css={paginationButtonStyle(page === pageIndex)}
                    onClick={() => setPage(pageIndex)}
                    disabled={page === pageIndex}
                  >
                    {pageIndex + 1}
                  </button>
                );
              })}

              {endPage < totalPages && (
                <button onClick={() => setPage(endPage)} css={paginationButtonStyle(false)}>
                  &gt;
                </button>
              )}
            </div>
          )}

          {isModalOpen && selectedTrainer && (
            <TrainerModal
              trainer={selectedTrainer}
              onClose={() => setIsModalOpen(false)}
              onStatusUpdated={() => {
                setIsModalOpen(false);
                setSelectedTrainer(null);
                setPage(0);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TrainerList;