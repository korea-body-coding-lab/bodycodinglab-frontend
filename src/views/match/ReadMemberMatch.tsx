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
  if (!trainerData) return <p></p>;
  return (
    <div css={m.MemberMatchContainerBox}>
      <h2 css={m.MemberMatchTitle}>매칭된 트레이너</h2>
      <br />
      <br />
      <div css={m.MemberMatchContainer}>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>이미지 데이터</p>
        </div>
        <br />
        <br />
        <div>
          <strong>트레이너 이름 </strong>
          <p>{trainerData.trainerName}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong>근무지 </strong>
          <p>{trainerData.trainerJobAddress}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong>매칭일 </strong>
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
  );
}
export default ReadMemberMatch;
