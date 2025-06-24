/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getTrainerAllTicketsRequest } from '@/apis/oneDayTicket/get-trainer-all-tickets.api';
import { GetTrainerAllTicketsResponseDto } from '@/dtos/oneDayTicket/response/get-trainer-all-tickets.response.dto';
import { TicketUseRequestDto } from '@/dtos/oneDayTicket/request/ticket-use.request.dto';
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
import { useOneDayTicket } from '@/apis/oneDayTicket/use-oneday-ticket.api';

const ITEMS_PER_PAGE = 5;

const UseOneDayTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetTrainerAllTicketsResponseDto[]>([]);
  const [usedAtMap, setUsedAtMap] = useState<Record<number, string>>({});
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

  const handleUsedAtChange = (ticketId: number, value: string) => {
    setUsedAtMap(prev => ({ ...prev, [ticketId]: value }));
  };

  const handleUseTicket = async (ticketId: number) => {
    const accessToken = cookies.accessToken;
    if (!accessToken) return;

    const usedAt = usedAtMap[ticketId];
    if (!usedAt) {
      alert('❌ 사용일자를 입력해주세요.');
      return;
    }

    const dto: TicketUseRequestDto = { usedAt };

    const response = await useOneDayTicket(ticketId, dto, accessToken);
    const { code, message } = response;

    if (code === 'SU') {
      alert('✅ 사용 처리 완료');
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
      setUsedAtMap(prev => {
        const copy = { ...prev };
        delete copy[ticketId];
        return copy;
      });

      const totalPages = Math.ceil((tickets.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } else {
      alert(`${message}`);
    }
  };

  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (tickets.length === 0) {
    return <p css={emptyTicketMessageStyle}>사용 가능한 체험권이 없습니다.</p>;
  }

  return (
    <section>
      <h2 css={mainTitleStyle}>사용 가능한 체험권</h2>
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
                <label htmlFor={`usedAt-${ticket.id}`}>사용일자:</label>
                <input
                  id={`usedAt-${ticket.id}`}
                  type="date"
                  css={inputStyle}
                  value={usedAtMap[ticket.id] || ''}
                  onChange={(e) => handleUsedAtChange(ticket.id, e.target.value)}
                />
              </div>
              <button css={buttonStyle(true)} onClick={() => handleUseTicket(ticket.id)}>
                사용하기
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* 페이지네이션 */}
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

export default UseOneDayTicket;
