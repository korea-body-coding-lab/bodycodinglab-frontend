/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getTrainerAllTicketsRequest } from '@/apis/oneDayTicket/get-trainer-all-tickets.api';
import { GetTrainerAllTicketsResponseDto } from '@/dtos/oneDayTicket/response/get-trainer-all-tickets.response.dto';
import { oneDayTicketStatusMap } from '@/utils/one-day-ticket-status.map';
import {
  ticketCardContainer,
  ticketCard,
  ticketHeader,
  ticketMeta,
  statusBadge,
  ticketBottom,
  cancelButtonStyle,
  usedButtonStyle,
  emptyTicketMessageStyle,
  paginationWrapper,
  paginationButton,
  activePaginationButton,
  filterButtonContainer,
  filterButtonsLeft,
  filterButtonStyle,
  mainTitleStyle,
} from './ticket.style';

const ITEMS_PER_PAGE = 5;

const GetTrainerAllTickets = () => {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetTrainerAllTicketsResponseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'ALL' | 'ISSUANCE' | 'USED' | 'CANCEL'>('ALL');

  useEffect(() => {
    const fetchTickets = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      try {
        const response = await getTrainerAllTicketsRequest(accessToken);
        const { code, data, message } = response;

        if (code === 'SU' && data) {
          setTickets(data);
        } else {
          console.error('체험권 목록 불러오기 실패:', message);
          alert('체험권 목록 불러오기 실패');
        }
      } catch (error) {
        console.error('체험권 목록 요청 중 오류 발생:', error);
        alert('체험권 목록 요청 중 문제가 발생했습니다.');
      }
    };

    fetchTickets();
  }, [cookies.accessToken]);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'ALL') return true;
    return ticket.status === filter;
  });

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (tickets.length === 0) {
    return <p css={emptyTicketMessageStyle}>발급된 체험권이 없습니다.</p>;
  }

  return (
    <section>
      <h2 css={mainTitleStyle}>전체 체험권 목록</h2>

      <div css={filterButtonContainer}>
        <div css={filterButtonsLeft}>
          <button css={filterButtonStyle(filter === 'ALL')} onClick={() => setFilter('ALL')}>전체</button>
          <button css={filterButtonStyle(filter === 'ISSUANCE')} onClick={() => setFilter('ISSUANCE')}>발급</button>
          <button css={filterButtonStyle(filter === 'USED')} onClick={() => setFilter('USED')}>사용</button>
          <button css={filterButtonStyle(filter === 'CANCEL')} onClick={() => setFilter('CANCEL')}>취소</button>
        </div>
      </div>

      <div css={ticketCardContainer}>
        {paginatedTickets.map(ticket => (
          <article key={ticket.id} css={ticketCard}>
            <div css={ticketHeader}>
              <div css={ticketMeta}>
                <p>체험권 번호: {ticket.id}</p>
                <p css={statusBadge}>{oneDayTicketStatusMap[ticket.status]}</p>
                <p>회원 이름: {ticket.memberName}</p>
                <p>회원 주소: {ticket.memberAddress}</p>
              </div>
            </div>
            <div css={ticketBottom}>
              <div>발급일자: {ticket.issuedAt}</div>
              {ticket.usedAt && <div css={usedButtonStyle}>사용일자: {ticket.usedAt}</div>}
              {ticket.canceledAt && <div css={cancelButtonStyle}>취소일자: {ticket.canceledAt}</div>}
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div css={paginationWrapper}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              css={index + 1 === currentPage ? activePaginationButton : paginationButton}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default GetTrainerAllTickets;
