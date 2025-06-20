import { Navigate, useNavigate } from 'react-router-dom';
import { getUserMatchId } from '@/apis/get-user-matchId'; 
import { useEffect, useState } from 'react';


function RedirectToUserMatch() {
  const [userMatchId, setUserMatchId] = useState<number | null | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMatchId() {
      const id = await getUserMatchId();
      if (!id) {
        
        navigate('/auth/login');
        return;
      }
      setUserMatchId(id);
    }
    fetchMatchId();
  }, [navigate]);


  if (userMatchId === undefined) {
    return <div>로딩 중...</div>;
  }


  return <Navigate to={`/personal-community-boards/${userMatchId}/1`}/>;
}
export default RedirectToUserMatch;
