/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  layoutStyle,
  mainStyle,
  mainTitleStyle,
  filterButtonContainer,
  filterButtonsLeft,
  filterButtonStyle,
} from './ticket.style';
import Header from '../header/Header';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import IssueOneDayTicket from './IssueOneDayTicket';
import UseOneDayTicket from './UseOneDayTicekt';
import CancelOneDayTicket from './CancelOneDayTicket';
import GetTrainerAllTickets from './GetTrainerAllTickets';

const TrainerOneDayTicket = () => {
  const [tab, setTab] = useState<'all' | 'issue' | 'use' | 'cancel'>('all');
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';

  return (
    <div>
      <Header />
      <div css={layoutStyle}>
        <MyPageSidebar />
        <main css={mainStyle}>
          <h2 css={mainTitleStyle}>🎟 체험권 관리</h2>

          <div css={filterButtonContainer}>
            <div css={filterButtonsLeft}>
              <button css={filterButtonStyle(tab === 'all')} onClick={() => setTab('all')}>
                전체 목록
              </button>
              <button css={filterButtonStyle(tab === 'issue')} onClick={() => setTab('issue')}>
                체험권 발급
              </button>
              <button css={filterButtonStyle(tab === 'use')} onClick={() => setTab('use')}>
                체험권 사용
              </button>
              <button css={filterButtonStyle(tab === 'cancel')} onClick={() => setTab('cancel')}>
                체험권 취소
              </button>
            </div>
          </div>

          {tab === 'all' && <GetTrainerAllTickets />}
          {tab === 'issue' && <IssueOneDayTicket />}
          {tab === 'use' && <UseOneDayTicket />}
          {tab === 'cancel' && <CancelOneDayTicket />}
        </main>
      </div>
    </div>
  );
};

export default TrainerOneDayTicket;
