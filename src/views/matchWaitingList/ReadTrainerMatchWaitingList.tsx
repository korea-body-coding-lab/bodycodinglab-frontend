/** @jsxImportSource @emotion/react */
import { findTrainerMatchWaitingListRequest } from "@/apis/MatchWaitingList/find.TrainerMatchWaitingList.api";
import { trainerMatchApproveRequest } from "@/apis/MatchWaitingList/put.MatchApprove.api";
import { trainerMatchRejectRequest } from "@/apis/MatchWaitingList/put.MatchReject.api";
import { memberMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get.Member.MatchWaitingList.response.dto";
import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as t from "./trainerMatchWaitingList.style";
import * as m from "./trainerModalStyle"
import Header from "../header/Header";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { getMenuTitleByPath } from "@/utils/menu.util";

function ReadTrainerMatchWaitingList() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [memberDatas, setMemberDatas] = useState<
    memberMatchWaitingListResponseDto[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [rejectResponse, setRejectResponse] = useState<string>("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null); 
  const navigate = useNavigate();

    const path = location.pathname;
  

  const loadingMemberData = async () => {
    setLoading(true);
    const token = cookies.accessToken;
    if (!token) {
      setLoading(false);
      alert("접근 권한이 존재하지 않습니다.");
      navigate("/");
    }

    try {
      const response = await findTrainerMatchWaitingListRequest(token);
      setMemberDatas(response.data);
    } catch (error) {
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadingMemberData();
  }, []);

  const matchApproveButton = async (matchWaitingListId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      alert("매칭을 승인할 권한이 존재하지 않습니다.");
      navigate("/");
    }

    const response = await trainerMatchApproveRequest(
      matchWaitingListId,
      { approvedStatus: "APPROVED" },
      token
    );
    if (response.code === "SU") {
      alert("매칭이 성공적으로 승인되었습니다.");
      await loadingMemberData();
      setMemberDatas((prevDatas) =>
        prevDatas?.map((data) =>
          data.matchWaitingListId === matchWaitingListId
            ? { ...data, approvedStatus: "APPROVED" }
            : data
        )
      );
    }
  };

  const handleOpenRejectModal = (matchWaitingListId: number) => {
  setSelectedMatchId(matchWaitingListId);
  setShowRejectModal(true);
};


   const handleRejectConfirm = async (matchWaitingListId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      alert("매칭을 거절할 권한이 없습니다.");
      return;
    }

    const response = await trainerMatchRejectRequest(
      matchWaitingListId,
      {
        approvedStatus: "REJECT",
        rejectResponse: rejectResponse,
      },
      token
    );

    if (response.code === "SU") {
      alert("매칭이 거절되었습니다.");
      setShowRejectModal(false);
      setSelectedMatchId(null);
      setRejectResponse("");
      await loadingMemberData();
    }
  };

  if (loading) return <p>로딩 중입니다.....</p>;
  if (!memberDatas || memberDatas.length === 0){

    return (
    <div>

      <div>
        <Header/>
      </div>

      <div style={{display: "flex"}}>
      <MyPageSidebar/>
      <div style={{marginTop: "25px", marginLeft: "15px"}}>
      <h2 style={{color: "#3F4756"}}>매칭 대기 관리 </h2>
      <p style={{marginTop: "25px"}}>매칭 신청 대기 중인 회원이 존재하지 않습니다.</p>
      </div>
      </div>

    </div>
    

    );
  }
  return (
  <div>

    <div>
      <Header />
    </div>

    <div css={t.trainerMatchWaitingListContainerLayout}>
    <MyPageSidebar/>
    
    <div style={{marginLeft: "15px", marginTop: "20px"}}>
      <h2 style={{color: "#3F4756"}}>매칭 대기 관리</h2>
    <div css={t.trainerMatchWaitingListContainerBox}>
      <div css={t.trainerMatchWaitingListContainer}>
        <table css={t.trainerMatchWaitingListBox}>
          <caption style={{color: "#3F4756", fontSize: "24px"}}>매칭 대기 리스트</caption>
          <br />
          <tr css={t.trainerMatchWatingListTableTitle}>
            <td>회원번호</td>
            <td>회원이름</td>
            <td>회원나이</td>
            <td>회원성별</td>
            <td>신청일자</td>
            <td>처리상태</td>
            <td></td>
            <td></td>
          </tr>
          {memberDatas.map((memberData) => (
            <tr key={memberData.matchWaitingListId}
            css={t.trainerMatchWatingListContext}
            >
              <td scope="col">{memberData.memberId}</td>
              <td scope="col">{memberData.memberName}</td>
              <td scope="col">{memberData.memberAge}</td>
              <td scope="col">{memberData.memberGender}</td>
              <td scope="col">
                {new Date(memberData.appliedAt).toLocaleString("ko-kR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              {memberData.approvedStatus === "NOT_APPROVED"
                ? "승인 대기"
                : memberData.approvedStatus === "APPROVED"
                ? "승인"
                : memberData.approvedStatus === "REJECT"
                ? "거절"
                : "알 수 없음"}

              <td>
                <button
                  css={t.trainerMatchWatingListTableButton(memberData.approvedStatus)}
                  onClick={() =>
                    matchApproveButton(memberData.matchWaitingListId)
                  }
                  disabled={memberData.approvedStatus !== "NOT_APPROVED"}
                >
                  매칭 승인
                </button>
              </td>

              <td>
                <button
                  css={t.trainerMatchWatingListTableButton(memberData.approvedStatus)}
                  onClick={() => handleOpenRejectModal(memberData.matchWaitingListId)}
                  disabled={memberData.approvedStatus === "APPROVED"}
                  >
                  매칭거부
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
    </div>
  </div>


        {showRejectModal && selectedMatchId !== null && (
        <div css={m.trainerRejectModalOverlay}>
          <div css={m.trainerRejectModalContent}>
            <h3>거절 사유 입력</h3>
            <textarea
              rows={5}
              placeholder="거절 사유를 입력해주세요"
              value={rejectResponse}
              onChange={(e) => setRejectResponse(e.target.value)}
            />
            <div css={m.trainerRejectModalButtons}>
              <button
                onClick={() => handleRejectConfirm(selectedMatchId)}
                disabled={!rejectResponse.trim()}
              >
                확인
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectResponse("");
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

  </div>



  );
}

export default ReadTrainerMatchWaitingList;
