import { findTrainerMatchListRequest } from '@/apis/match/find,TrainerMatchListRequest.api';
import { memberMatchListResponseDto } from '@/dtos/match/response/member.matchList.response.dto';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function ReadTrainerMatchList() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [memberDatas, setMemberDatas] = useState<memberMatchListResponseDto[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  useEffect(() => {
    const loadingMemberData = async () => {

    setLoading(true);
    const token = cookies.accessToken;
    if(!token){
      setLoading(false);
      alert("접근 권한이 존재하지 않습니다.");
      navigate("/");
    }
    
    try{
      const response = await findTrainerMatchListRequest(token);
      setMemberDatas(response.data)
    }catch(error){
      alert("데이터를 불러오는 중 오류가 발생했습니다.")
    }finally{
      setLoading(false)
    }

    setLoading(false)
  }

    loadingMemberData()
  }, [])
  


  if(loading) return <p>로딩중입니다.......</p>
  if(!memberDatas) return <p>매칭된 회원이 존재하지 않습니다.</p>
  return (
    <div>
      <p>매칭 관리</p>
      {memberDatas.map((memberData) => (
        <div key={memberData.matchId}>
          
        </div>
      ))}
    </div>
  )
}

export default ReadTrainerMatchList