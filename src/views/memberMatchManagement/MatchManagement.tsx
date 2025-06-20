import { findMemberMatchRequest } from '@/apis/match/find.Member.Match.api';
import { findMemberMatchWaitingListRequest } from '@/apis/memberMatchWaitingList/find.MemberMatchWaitingList.api';
import { trainerMatchResponseDto } from '@/dtos/match/response/trainer.Match.Response.Dto';
import { trainerMatchWaitingListResponseDto } from '@/dtos/matchWaitingList/response/get.Trainer.MatchWaitingList.Response.Dto';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ReadMemberMatch from '../match/ReadMemberMatch';
import ReadMemberMatchWatingList from '../matchWaitingList/ReadMemberMatchWatingList';

function MatchManagement() {
  const [cookies] = useCookies(["accessToken"]);
  const [matchData, setMatchData] = useState<trainerMatchResponseDto | null>(null);
  const [waitingData, setWaitingData] = useState<trainerMatchWaitingListResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTrainerData = async () => {

      setLoading(true);
      const token = cookies.accessToken;
      if(!token){
        setLoading(false);
        alert("접근 권한이 존재하지 않습니다.");
        navigate("/");
      } 

        try {
        
        const matchResponse = await findMemberMatchRequest(token);
        if (matchResponse?.data) {
          setMatchData(matchResponse.data);
        } else {
          
          const waitingResponse = await findMemberMatchWaitingListRequest(token);
          if (waitingResponse?.data) {
            setWaitingData(waitingResponse.data);
          }
        }
      } catch (error) {
        console.error("매칭 정보를 불러오지 못했습니다:", error);
      } finally {
        setLoading(false);
      }
    }
    loadingTrainerData();
  }, [])


  if (loading) return <p>로딩 중입니다...</p>;
  if (matchData) return <ReadMemberMatch />;
  if (waitingData) return <ReadMemberMatchWatingList />;
  return (
    <div>매칭 신청 기록이 존재하지 않습니다.</div>
  )
}

export default MatchManagement