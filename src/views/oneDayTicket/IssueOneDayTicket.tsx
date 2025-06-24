/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { TicketIssueRequestDto } from '@/dtos/oneDayTicket/request/ticket-issue.request.dto';
import {
  ticketCard,
  mainTitleStyle,
  formField,
  inputStyle,
  buttonStyle,
} from './ticket.style';
import { issueOneDayTicket } from '@/apis/oneDayTicket/issue-oneday-ticket.api';

const IssueOneDayTicket = () => {
  const [cookies] = useCookies(['accessToken']);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleIssue = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      alert('로그인 후 사용해주세요.');
      return;
    }

    const dto: TicketIssueRequestDto = {
      username: username.trim(),
      name: name.trim(),
    };

    try {
      const response = await issueOneDayTicket(dto, accessToken);
      const { code, message } = response;

      if (code === 'SU') {
        alert('체험권이 성공적으로 발급되었습니다!');
        setUsername('');
        setName('');
      } else {
        alert(`${message}`);
      }
    } catch (error) {
      alert('체험권 발급 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleIssue();
  };

  return (
    <section css={ticketCard}>
      <h2 css={mainTitleStyle}>회원 체험권 발급</h2>
      <form onSubmit={handleSubmit}>
        <div css={formField}>
          <label htmlFor="username">회원 아이디 (username)</label>
          <input
            id="username"
            css={inputStyle}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div css={formField}>
          <label htmlFor="name">회원 이름</label>
          <input
            id="name"
            css={inputStyle}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button css={buttonStyle(true)} type="submit">
          체험권 발급
        </button>
      </form>
    </section>
  );
};

export default IssueOneDayTicket;
