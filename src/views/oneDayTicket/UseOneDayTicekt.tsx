/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { input, submitButton, container, heading } from '@/views/trainer/TrainerCareerStyle';
import { TicketUseRequestDto } from '@/dtos/oneDayTicket/request/ticket-use.request.dto';
import { useOneDayTicket } from '@/apis/oneDayTicket/use-oneday-ticket.api';

const UseOneDayTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';

  const [ticketId, setTicketId] = useState<number | null>(null);
  const [usedAt, setUsedAt] = useState<string>('');

  const handleUse = async () => {
    if (!ticketId || !usedAt.trim()) {
      alert('체험권 ID와 사용일자를 모두 입력해주세요.');
      return;
    }

    const dto: TicketUseRequestDto = { usedAt };
    const res = await useOneDayTicket(ticketId, dto, accessToken);

    if (res.code === 'SU') {
      alert('✅ 체험권 사용 완료');
      setTicketId(null);
      setUsedAt('');
    } else {
      alert('❌ ' + res.message);
    }
  };

  return (
    <div css={container}>
      <h2 css={heading}>🎟 체험권 사용</h2>

      <input
        type="number"
        placeholder="체험권 ID"
        value={ticketId ?? ''}
        onChange={(e) => setTicketId(Number(e.target.value))}
        css={input}
      />

      <input
        type="date"
        placeholder="사용일자"
        value={usedAt}
        onChange={(e) => setUsedAt(e.target.value)}
        css={input}
      />

      <button onClick={handleUse} css={submitButton}>
        ✅ 사용 처리
      </button>
    </div>
  );
};

export default UseOneDayTicket;
