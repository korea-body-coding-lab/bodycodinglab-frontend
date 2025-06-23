/** @jsxImportSource @emotion/react */
import { findMemberMatchRequest } from "@/apis/match/find.Member.Match.api";
import { trainerMatchResponseDto } from "@/dtos/match/response/find.trainer.Match.Response.Dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as m from "./memberMatch.style";
import { deleteMemberMatchRequest } from "@/apis/match/delete.Member.Match.api";


function ReadMemberMatch() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [trainerData, setTrainerData] = useState<
    trainerMatchResponseDto | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTrainerData = async () => {
      setLoading(true);
      const token = cookies.accessToken;
      if (!token) {
        setLoading(false);
        alert("접근 권한이 존재하지 않습니다.");
        navigate("/");
      }
      const response = await findMemberMatchRequest(token);
      setTrainerData(response.data);
      setLoading(false);
    };

    loadingTrainerData();
  }, []);

  const matchCancelButton = async (matchId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      setLoading(false);
      alert("접근 권한이 존재하지 않습니다.");
      navigate("/");
    }

    const response = await deleteMemberMatchRequest(matchId, token);
    console.log(trainerData);
    setTrainerData(undefined);
    if (response.code !== "SU") {
      alert("매칭이 취소되지 않았습니다");
    } else {
      alert("매칭이 취소 되었습니다.");
      navigate("/");
    }
  };

  if (loading) return <p>로딩 중입니다....</p>;
  if (!trainerData) return <p>매칭신청이 거절되었거나 신청한 트레이너가 존재하지 않습니다.</p>;
  return (
    <div>
    
    <div css={m.MemberMatchContainerBox}>
      <h2 css={m.MemberMatchTitle}>매칭된 트레이너</h2>
      <br />
      <br />
      <div css={m.MemberMatchContainer}>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={trainerData.profileImageUrl ? `http://localhost:8080${trainerData.profileImageUrl}` : '/default-profile.png'} alt="트레이너 이미지"  css={m.trainerProfile}/>
        </div>
        <br />
        <br />
        <div>
          <strong style={{color: "#3F4756"}}>트레이너 이름 </strong>
          <p>{trainerData.trainerName}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong style={{color: "#3F4756"}}>근무지 </strong>
          <p>{trainerData.trainerJobAddress}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong style={{color: "#3F4756"}}>매칭일 </strong>
          <p>
            {new Date(trainerData.matchedAt).toLocaleString("ko-kR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
        <br />
        <br />
        <div css={m.MemberMatchButtonContainer}>
          <button
            css={m.MatchButton}
            onClick={() => matchCancelButton(trainerData.matchId)}
          >
            매칭 취소
          </button>
        </div>
      </div>
    </div>

      </div>
    
  );
}
export default ReadMemberMatch;
