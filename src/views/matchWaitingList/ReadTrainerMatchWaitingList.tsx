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
      <Header />
      <div css={t.trainerMatchContainerLayout}>
        <MyPageSidebar />
        <div css={t.trainerMatchMainBox}>
          <h2 style={{ color: "#3F4756" }}>매칭 대기 관리</h2>
          <div css={t.trainerMatchTableWrapper}>
            <table css={t.trainerMatchTableStyle}>
              <thead css={t.trainerMatchTableHead}>
                <tr>
                  <th>회원번호</th>
                  <th>이름</th>
                  <th>나이</th>
                  <th>성별</th>
                  <th>신청일</th>
                  <th>상태</th>
                  <th colSpan={2}>처리</th>
                </tr>
              </thead>
              <tbody>
                {memberDatas.map((data) => (
                  <tr key={data.matchWaitingListId} css={t.trainerMatchTableRow}>
                    <td css={t.trainerMatchTableCell}>{data.memberId}</td>
                    <td css={t.trainerMatchTableCell}>{data.memberName}</td>
                    <td css={t.trainerMatchTableCell}>{data.memberAge}</td>
                    <td css={t.trainerMatchTableCell}>{data.memberGender}</td>
                    <td css={t.trainerMatchTableCell}>{new Date(data.appliedAt).toLocaleString()}</td>
                    <td css={t.trainerMatchTableCell}>{
                      data.approvedStatus === "NOT_APPROVED"
                        ? "승인 대기"
                        : data.approvedStatus === "APPROVED"
                        ? "승인"
                        : "거절"
                    }</td>
                  
                    <td css={t.tdButtonCell}>
                      <button
                        css={t.trainerMatchButton(data.approvedStatus)}
                        onClick={() => matchApproveButton(data.matchWaitingListId)}
                        disabled={data.approvedStatus !== "NOT_APPROVED"}
                      >
                        승인
                      </button>
                    </td>
                    <td>
                      <button
                        css={t.trainerMatchButton(data.approvedStatus)}
                        onClick={() => {
                          setSelectedMatchId(data.matchWaitingListId);
                          setShowRejectModal(true);
                        }}
                        disabled={data.approvedStatus === "APPROVED"}
                      >
                        거절
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
