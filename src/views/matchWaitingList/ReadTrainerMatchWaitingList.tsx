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
import Header from "../header/Header";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { getMenuTitleByPath } from "@/utils/menu.util";

function ReadTrainerMatchWaitingList() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [memberDatas, setMemberDatas] = useState<
    memberMatchWaitingListResponseDto[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

    const path = location.pathname;
    const menuTitle = getMenuTitleByPath(path);

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

  const matchRejectBoutton = async (matchWaitingListId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      alert("매칭을 취소할 권한이 존재하지 않습니다.");
    }

    const response = await trainerMatchRejectRequest(
      matchWaitingListId,
      { approvedStatus: "REJECT" },
      token
    );
    if (response.code === "SU") {
      alert("매칭이 거부처리되었습니다.");
      await loadingMemberData();
      setMemberDatas((prevDatas) =>
        prevDatas?.map((data) =>
          data.matchWaitingListId === matchWaitingListId
            ? { ...data, approvedStatus: "REJECT" }
            : data
        )
      );
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
      <div style={{marginTop: "25px"}}>
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
              {memberData.approvedStatus === "NOT_APPROVED" ? (
                <td scope="col">승인 대기</td>
              ) : (
                <td scope="col">승인</td>
              )}

              <td>
                <button
                  css={t.trainerMatchWatingListTableButton}
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
                  css={t.trainerMatchWatingListTableButton}
                  onClick={() =>
                    matchRejectBoutton(memberData.matchWaitingListId)
                  }
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
  </div>
  );
}

export default ReadTrainerMatchWaitingList;
