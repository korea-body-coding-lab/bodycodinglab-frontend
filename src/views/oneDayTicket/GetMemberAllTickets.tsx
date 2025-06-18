/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import Header from '../header/Header';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { useLocation } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/menu.util';
import { useCookies } from 'react-cookie';
import { GetMemberAllTicketsResponseDto } from '@/dtos/oneDayTicket/response/get-member-all-tickets.response.dto';
import { getMemberAllTicketsRequest } from '@/apis/oneDayTicket/get-member-all-tickets.api';
import { oneDayTicketStatusMap } from '@/utils/one-day-ticket-status.map';
import { filterButtonContainer, filterButtonsLeft, filterButtonStyle, layoutStyle, mainStyle, mainTitleStyle, statusBadge, ticketBottom, ticketCard, ticketCardContainer, ticketCountText, ticketHeader, ticketMeta, trainerId, trainerImage, trainerInfo, trainerName } from './ticket.style';

function GetMemberAllTickets() {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetMemberAllTicketsResponseDto[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const location = useLocation();
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);

  const fetchTickets = async () => {
    const accessToken = cookies.accessToken;

    if (!accessToken) return;

    try {
      const response = await getMemberAllTicketsRequest(accessToken);
      const { code, message, data } = response;

      if (code === 'SU' && data) {
        setTickets(data);
      } else {
        console.error('체험권 목록 불러오기 실패: ', message);
        alert('체험권 목록 불러오기 실패');
      }
    } catch (e) {
      console.error('체험권 목록 요청 중 에러 발생:', e);
      alert('체험권 목록 요청 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
      fetchTickets();
  }, []);

  const filteredTickets = selectedStatus === '전체'
  ? tickets
  : tickets.filter((ticket) => oneDayTicketStatusMap[ticket.status] === selectedStatus);

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
              {['전체', '발급', '사용 완료', '취소'].map((label) => (
                <button
                  key={label}
                  css={filterButtonStyle(selectedStatus === label)}
                  onClick={() => setSelectedStatus(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div css={ticketCountText}>
              남은 체험권: {tickets[0]?.count ?? 0}회
            </div>
          </div>
          <section css={ticketCardContainer}>
            {filteredTickets.map((ticket) => (
              <article key={ticket.id} css={ticketCard}>
                <div css={ticketHeader}>
                  <div css={ticketMeta}>
                    <p>
                      체험권 번호: <span>{ticket.id}</span>
                    </p>
                    <p css={statusBadge}>{oneDayTicketStatusMap[ticket.status]}</p>
                    <p>{ticket.jobAddress}</p>
                  </div>
                  <div css={trainerInfo}>
                    <div css={trainerImage} />
                    <p css={trainerName}>{ticket.trainerName}</p>
                    <p css={trainerId}>({ticket.trainerId})</p>
                  </div>
                </div>
                <div css={ticketBottom}>
                  <span>발급일자: {ticket.issuedAt}</span>
                  <span>사용일자: {ticket.usedAt}</span>
                  <span>취소일자: {ticket.canceledAt}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default GetMemberAllTickets;