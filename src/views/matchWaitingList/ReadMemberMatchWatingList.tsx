/** @jsxImportSource @emotion/react */
import { findMemberMatchWaitingListRequest } from "@/apis/MatchWaitingList/find.MemberMatchWaitingList.api";
import { trainerMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get.Trainer.MatchWaitingList.Response.Dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as m from "./memberMatchWaitingList.style";
import { useNavigate } from "react-router-dom";
import { postSubscriptionRequest } from "@/apis/subscription/post.subscription.api";
import { confirmPaymentRequestDto } from "@/dtos/payment/reqeust/Confirm.Payment.Request.Dto";
import { postPaymentRequestDto } from "@/dtos/payment/reqeust/post.Payment.Request.Dto";
import { postPaymentRequeust } from "@/apis/payment/post.payment.api";
import { memberCancelRequest } from "@/apis/MatchWaitingList/delete.MatchCancel.api";

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
      token
    );
    if (response.code === "SU") {
      alert("매칭이 성공적으로 취소되었습니다.");
      navigate("/");
    }
  };

  



  const subscriptionButton = async () => {
    const token = cookies.accessToken;
    if (!token) {
      alert("구독 신청을 할 권한이 존재하지 않습니다.");
    }

    const paymentRequestDto: postPaymentRequestDto = {
    amount: 149000,
  };

  
  const paymentResponse = await postPaymentRequeust(paymentRequestDto, token);
  if (!paymentResponse.data) {
    alert("결제 생성에 실패하였습니다.");
    return;
  }

  const { orderId } = paymentResponse.data;


  const subscriptionRequestDto: confirmPaymentRequestDto = {
    orderId,
    provider: "KAKAO",
    matchWaitingListId: trainerData?.matchWaitingListId
  };

    const response = await postSubscriptionRequest(subscriptionRequestDto, token);
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
        <img src={trainerData.profileImageUrl ? `http://localhost:8080${trainerData.profileImageUrl}` : '/default-profile.png'} alt="트레이너 이미지" css={m.trainerProfile} />
        <br />
        <br />
        <div>
          <strong style={{ color:"#3F4756"}}>트레이너 이름:</strong> <p>{trainerData.trainerName}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong  style={{ color:"#3F4756"}}>근무지:</strong> <p>{trainerData.trainerJobAddress}</p>
        </div>
        <hr />
        <br />
        <br />
        <div>
          <strong  style={{ color:"#3F4756"}}>신청일:</strong>{" "}
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
        {trainerData.approvedStatus === "REJECT" ?  <>
        <hr />
        <br />
        <br />
        <div>
          <div style={{textAlign: "center"}}>
          <strong style={{ color: "red"}}>매칭 거절 됨</strong>
          </div>
          <br />
          <strong  style={{ color:"#3F4756"}}>거절 사유:</strong>{" "}
          <p>
            {trainerData.rejectResponse}
          </p>
        </div>
        </> : 
          <div>
            <br />
            <p>신청 대기 중</p>
          </div>
         } 
        <br />
        <br />
        <div css={m.MemberMatchWaitingListButtonContainer}>
          <button css={m.MatchWaitingListButton} onClick={matchCancelButton}>
            신청 취소
          </button>
          <button
            onClick={() => subscriptionButton()}
            css={m.MatchWaitingListButton}
            disabled={trainerData.approvedStatus === "REJECT" || trainerData.approvedStatus === "NOT_APPROVED"}
          >
            구독
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadMemberMatchWatingList;
