/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { input, submitButton, container, heading } from '@/views/trainer/TrainerCareerStyle';
import { issueOneDayTicket } from '@/apis/oneDayTicket/issue-oneday-ticket.api';
import { TicketIssueRequestDto } from '@/dtos/oneDayTicket/request/ticket-issue.request.dto';
import { getMemberByUsernameAndName } from '@/apis/user/get-member-by-username-and-name.api';

const IssueTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIssue = async () => {
    if (!username.trim() || !name.trim()) {
      alert('아이디와 이름을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const memberRes = await getMemberByUsernameAndName(username.trim(), name.trim());

      console.log('username:', `"${username.trim()}"`, 'name:', `"${name.trim()}"`);

      if (!memberRes.data) {
        alert('❌ 해당 회원을 찾을 수 없습니다.');
        return;
      }

      const memberId = memberRes.data.memberId;
      console.log(memberId);

      const dto: TicketIssueRequestDto = { memberId };
      const res = await issueOneDayTicket(dto, accessToken);

      if (res.code === 'SU') {
        alert('✅ 체험권 발급 성공!');
        setUsername('');
        setName('');
      } else {
        alert('❌ 발급 실패: ' + res.message);
      }
    } catch (error) {
      alert('❌ 오류 발생');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={container}>
      <h2 css={heading}>🎟 체험권 발급</h2>

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

      <button onClick={handleIssue} css={submitButton} disabled={isLoading}>
        {isLoading ? '발급 중...' : '➕ 발급'}
      </button>
    </div>
  );
};

export default IssueTicket;
