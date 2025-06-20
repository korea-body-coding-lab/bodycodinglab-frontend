/** @jsxImportSource @emotion/react */
import { findMemberMatchWaitingListRequest } from "@/apis/MatchWaitingList/find.MemberMatchWaitingList.api";
import { trainerMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get.Trainer.MatchWaitingList.Response.Dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as m from "./memberMatchWaitingList.style";
import { memberCancelRequest } from "@/apis/MatchWaitingList/put.MatchCancel.api";
import { useNavigate } from "react-router-dom";
import { postSubscriptionRequest } from "@/apis/subscription/post.subscription.api";

function ReadMemberMatchWatingList() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [trainerData, setTrainerData] = useState<
    trainerMatchWaitingListResponseDto | undefined
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
      const response = await findMemberMatchWaitingListRequest(token);
      setTrainerData(response.data);
      setLoading(false);
    };

    loadingTrainerData();
  }, []);

  const matchCancelButton = async () => {
    const token = cookies.accessToken;
    if (!token) {
      alert("매칭을 취소할 권한이 존재하지 않습니다.");
      navigate("/");
    }

    const response = await memberCancelRequest(
      { approvedStatus: "REJECT" },
      token
    );
    if (response.code === "SU") {
      alert("매칭이 성공적으로 취소되었습니다.");
      navigate("/");
    }
  };

  const subscriptionButton = async (matchWaitingListId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      alert("구독 신청을 할 권한이 존재하지 않습니다.");
    }

    const response = await postSubscriptionRequest(matchWaitingListId, token);
    if (response.data) {
      alert("구독 신청 완료");
      navigate("/");
    }
  };

  if (loading) return <p>로딩 중입니다...</p>;
  if (!trainerData)
    return <p>매칭 신청한 트레이너가 존재하지 않거나 신청이 거절되었습니다.</p>;

  return (
    <div css={m.MemberMatchWaitingListContainerBox}>
      <div css={m.MemberMatchWaitingListContainer}>
        <h2 css={m.MemberMatchWaitingListTitle}>매칭 신청한 트레이너</h2>
        <br />
        <br />
        <p>트레이너 프로필 이미지 자리</p>
        <br />
        <br />
        <div>
          <strong>트레이너 이름:</strong> <p>{trainerData.trainerName}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong>근무지:</strong> <p>{trainerData.trainerJobAddress}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong>신청일:</strong>{" "}
          <p>
            {new Date(trainerData.appliedAt).toLocaleString("ko-kR", {
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
        <div css={m.MemberMatchWaitingListButtonContainer}>
          <button css={m.MatchWaitingListButton} onClick={matchCancelButton}>
            신청 취소
          </button>
          <button
            onClick={() => subscriptionButton(trainerData.matchWaitingListId)}
            css={m.MatchWaitingListButton}
            disabled={trainerData.approvedStatus === "NOT_APPROVED"}
          >
            구독
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadMemberMatchWatingList;
