/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getTrainerAllTicketsRequest } from '@/apis/oneDayTicket/get-trainer-all-tickets.api';
import { GetTrainerAllTicketsResponseDto } from '@/dtos/oneDayTicket/response/get-trainer-all-tickets.response.dto';
import { TicketCancelRequestDto } from '@/dtos/oneDayTicket/request/ticket-cancel.request.dto';
import {
  ticketCardContainer,
  ticketCard,
  ticketHeader,
  ticketMeta,
  ticketBottom,
  mainTitleStyle,
  buttonStyle,
  inputStyle,
  emptyTicketMessageStyle,
  paginationWrapper,
  paginationButton,
  activePaginationButton,
} from './ticket.style';
import { cancelOneDayTicket } from '@/apis/oneDayTicket/cancel-oneday-ticket.api';

const ITEMS_PER_PAGE = 5;

const CancelOneDayTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetTrainerAllTicketsResponseDto[]>([]);
  const [cancelReasonMap, setCancelReasonMap] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const response = await getTrainerAllTicketsRequest(accessToken);
      const { code, data } = response;

      if (code === 'SU' && data) {
        const issuanceOnly = data.filter(ticket => ticket.status === 'ISSUANCE');
        setTickets(issuanceOnly);
      } else {
        alert('❌ 체험권 목록 불러오기 실패');
      }
    };

    fetchTickets();
  }, [cookies.accessToken]);

  const handleCancelReasonChange = (ticketId: number, value: string) => {
    setCancelReasonMap(prev => ({ ...prev, [ticketId]: value }));
  };

  const handleCancelTicket = async (ticketId: number) => {
    const accessToken = cookies.accessToken;
    if (!accessToken) return;

    const cancelReason = cancelReasonMap[ticketId];
    if (!cancelReason || cancelReason.trim() === '') {
      alert('❌ 취소 사유를 입력해주세요.');
      return;
    }

    const dto: TicketCancelRequestDto = { cancelReason: cancelReason };

    const response = await cancelOneDayTicket(ticketId, dto, accessToken);
    const { code, message } = response;

    if (code === 'SU') {
      alert('✅ 체험권이 성공적으로 취소되었습니다.');
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
      setCancelReasonMap(prev => {
        const copy = { ...prev };
        delete copy[ticketId];
        return copy;
      });

      const totalPages = Math.ceil((tickets.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } else {
      alert(`❌ ${message}`);
    }
  };

  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (tickets.length === 0) {
    return <p css={emptyTicketMessageStyle}>취소 가능한 체험권이 없습니다.</p>;
  }

  return (
    <section>
      <h2 css={mainTitleStyle}>체험권 취소 처리</h2>
      <div css={ticketCardContainer}>
        {paginatedTickets.map(ticket => (
          <article key={ticket.id} css={ticketCard}>
            <div css={ticketHeader}>
              <div css={ticketMeta}>
                <p>체험권 번호: {ticket.id}</p>
                <p>회원 이름: {ticket.memberName}</p>
                <p>회원 주소: {ticket.memberAddress}</p>
              </div>
            </div>
            <div css={ticketBottom}>
              <div>
                <label htmlFor={`reason-${ticket.id}`}>취소 사유:</label>
                <input
                  id={`reason-${ticket.id}`}
                  type="text"
                  css={inputStyle}
                  value={cancelReasonMap[ticket.id] || ''}
                  onChange={(e) => handleCancelReasonChange(ticket.id, e.target.value)}
                />
              </div>
              <button css={buttonStyle(false)} onClick={() => handleCancelTicket(ticket.id)}>
                취소하기
              </button>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div css={paginationWrapper}>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              css={currentPage === idx + 1 ? activePaginationButton : paginationButton}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default CancelOneDayTicket;
