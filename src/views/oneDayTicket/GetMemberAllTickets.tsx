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
import { cancelButtonStyle, filterButtonContainer, getCardStyleByStatus, layoutStyle, mainStyle, mainTitleStyle, sectionDivider, statusBadge, ticketBottom, ticketCard, ticketCardContainer, ticketCountText, ticketHeader, ticketMeta, trainerId, trainerImage, trainerInfo, trainerName, usedButtonStyle } from './ticket.style';

function GetMemberAllTickets() {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetMemberAllTicketsResponseDto[]>([]);
  const location = useLocation();
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const issuedTickets = tickets.filter(ticket => ticket.status === 'ISSUANCE');
  const usedTickets = tickets.filter(ticket => ticket.status === 'USED');
  const canceledTickets = tickets.filter(ticket => ticket.status === 'CANCEL');
  
  useEffect(() => {
      fetchTickets();
  }, []);

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
            <div css={ticketCountText}>
              남은 체험권: {tickets[0]?.count ?? 0}회
            </div>
          </div>
          <section css={ticketCardContainer}>
            {issuedTickets.length > 0 && (
              <>
                <h3>발급 티켓</h3>
                {issuedTickets.map((ticket) => (
                  <article key={ticket.id} css={[ticketCard, getCardStyleByStatus(ticket.status)]}>
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
                      <div>발급일자: {ticket.issuedAt}</div>
                      {ticket.usedAt && <div css={usedButtonStyle}>사용일자: {ticket.usedAt}</div>}
                      {ticket.canceledAt && <div css={cancelButtonStyle}>취소일자: {ticket.canceledAt}</div>}
                    </div>
                  </article>
                ))}
                {(usedTickets.length > 0 || canceledTickets.length > 0) && (
                  <div css={sectionDivider} />
                )}
              </>
            )}

            {usedTickets.length > 0 && (
              <>
                <h3>사용 완료 티켓</h3>
                {usedTickets.map((ticket) => (
                  <article key={ticket.id} css={[ticketCard, getCardStyleByStatus(ticket.status)]}>
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
                      <div>발급일자: {ticket.issuedAt}</div>
                      {ticket.usedAt && <div css={usedButtonStyle}>사용일자: {ticket.usedAt}</div>}
                      {ticket.canceledAt && <div css={cancelButtonStyle}>취소일자: {ticket.canceledAt}</div>}
                    </div>
                  </article>
                ))}
                {canceledTickets.length > 0 && <div css={sectionDivider} />}
              </>
            )}

            {canceledTickets.length > 0 && (
              <>
                <h3>취소된 티켓</h3>
                {canceledTickets.map((ticket) => (
                  <article key={ticket.id} css={[ticketCard, getCardStyleByStatus(ticket.status)]}>
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
                      <div>발급일자: {ticket.issuedAt}</div>
                      {ticket.usedAt && <div css={usedButtonStyle}>사용일자: {ticket.usedAt}</div>}
                      {ticket.canceledAt && <div css={cancelButtonStyle}>취소일자: {ticket.canceledAt}</div>}
                    </div>
                  </article>
                ))}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default GetMemberAllTickets;