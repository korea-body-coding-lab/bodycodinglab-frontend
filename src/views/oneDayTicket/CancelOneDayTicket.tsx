/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { input, submitButton, container, heading } from '@/views/trainer/TrainerCareerStyle';
import { TicketCancelRequestDto } from '@/dtos/oneDayTicket/request/ticket-cancel.request.dto';
import { cancelOneDayTicket } from '@/apis/oneDayTicket/cancel-oneday-ticket.api';
import { getTrainerAllTicketsRequest } from '@/apis/oneDayTicket/get-trainer-all-tickets.api';
import { getMemberByUsernameAndName } from '@/apis/user/get-member-by-username-and-name.api';

const CancelOneDayTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  const handleCancel = async () => {
    if (!username.trim() || !name.trim() || !cancelReason.trim()) {
      alert('아이디, 이름, 취소 사유를 모두 입력해주세요.');
      return;
    }

    const memberRes = await getMemberByUsernameAndName(username, name, accessToken);
    if (memberRes.code !== 'SU' || !memberRes.data?.memberId) {
      alert('❌ 해당 회원을 찾을 수 없습니다.');
      return;
    }
    const memberId = memberRes.data.memberId;

    const ticketsRes = await getTrainerAllTicketsRequest(accessToken);
    if (ticketsRes.code !== 'SU' || !ticketsRes.data) {
      alert('❌ 체험권 목록을 가져오지 못했습니다.');
      return;
    }

    const ticket = ticketsRes.data
      .filter(t => Number(t.memberId) === memberId && t.status === 'ISSUANCE')
    .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime())[0];

    console.log("memberId:", memberId, typeof memberId);
console.log("tickets:", ticketsRes.data);

ticketsRes.data.forEach((t, i) => {
  console.log(`[${i}] t.memberId:`, t.memberId, typeof t.memberId);
  console.log(`[${i}] matched:`, t.memberId == memberId);
});

const filtered = ticketsRes.data.filter(t => t.memberId == memberId && t.status === 'ISSUANCE');
console.log("Filtered tickets:", filtered);

console.log('입력한 username:', username);
console.log('입력한 name:', name);
console.log('검색된 memberId:', memberId);

    if (!ticket) {
      alert('❌ 취소 가능한 체험권이 없습니다.');
      return;
    }

    const dto: TicketCancelRequestDto = {
      cancelReason: cancelReason.trim(),
    };
    const res = await cancelOneDayTicket(ticket.id, dto, accessToken);

    if (res.code === 'SU') {
      alert('✅ 체험권 취소 완료');
      setUsername('');
      setName('');
      setCancelReason('');
    } else {
      alert('❌ ' + res.message);
    }
  };

  return (
    <div css={container}>
      <h2 css={heading}>🚫 체험권 취소</h2>

      <input
        type="text"
        placeholder="회원 아이디 (username)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        css={input}
      />

      <input
        type="text"
        placeholder="회원 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        css={input}
      />

      <input
        type="text"
        placeholder="취소 사유를 입력하세요"
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        css={input}
      />

      <button onClick={handleCancel} css={submitButton}>
        ❌ 취소하기
      </button>
    </div>
  );
};

export default CancelOneDayTicket;
