/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { findTrainerMatchRequest } from "@/apis/match/find.trainer.Match.api";
import { findTrainerMatchListRequest } from "@/apis/match/find.TrainerMatchListRequest.api";
import { memberMatchResponseDto } from "@/dtos/match/response/find.member.match.response.dto";
import { memberMatchListResponseDto } from "@/dtos/match/response/find.member.matchList.response.dto";
import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FormModal from "./FormModal";
import Header from "../header/Header";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import * as t from "./trainerMatch.style";

function ReadTrainerMatchList() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [memberDatas, setMemberDatas] = useState<
    memberMatchListResponseDto[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<memberMatchResponseDto | null>(
    null
  );
  const [modalFormData, setModalFormData] =
    useState<memberFormResponseDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingMemberData = async () => {
      setLoading(true);
      const token = cookies.accessToken;
      if (!token) {
        setLoading(false);
        alert("접근 권한이 존재하지 않습니다.");
        navigate("/");
      }

      try {
        const response = await findTrainerMatchListRequest(token);
        setMemberDatas(response.data);
      } catch (error) {
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }

      setLoading(false);
    };

    loadingMemberData();
  }, []);

  const getMemberData = async (matchId: number) => {
    const token = cookies.accessToken;
    if (!token) {
      setLoading(false);
      alert("접근 권한이 존재하지 않습니다.");
      navigate("/");
    }

    const response = await findTrainerMatchRequest(matchId, token);
    if (response.data) {
      setModalData(response.data);
      setModalFormData(response.data.memberFormResponseDto || null);
      setIsModalOpen(true);
    }
  };

// return (
  // <div>

  //   <div>
  //       <Header/>
  //   </div>

  //   <div style={{display: "flex"}}>
  //     <MyPageSidebar/> 
  //     <div  style={{marginTop: "25px"}}>
  //       <h2  style={{color: "#3F4756"}}>매칭 조회</h2>
  //       <br />
  //       <p>매칭 신청 기록이 존재하지 않습니다.</p>
  //     </div>
  //   </div>
  // </div>);

  if (loading) return <p>로딩중입니다.......</p>;
  if (!memberDatas || memberDatas.length === 0)
    return (
    <div>
      
      <div>
        <Header/>
      </div>

      <div style={{display: "flex"}}>
        <MyPageSidebar/> 
          <div  style={{marginTop: "25px" , marginLeft: "15px"}}>
            <h2  style={{color: "#3F4756"}}>매칭 관리</h2>
            <br />
            <p>매칭 신청 기록이 존재하지 않습니다.</p>
          </div>
        </div>
      
      </div>);
  return (
    <div>

      <div>
        <Header/>
      </div>

      <div css={t.matchListContainerBox}>
      <MyPageSidebar/>
      <div css={t.matchListContainer}>
      <h2 style={{color: "#3F4756"}}>매칭 관리</h2>
      <div css={t.matchCardListBox}>
      <h2 style={{textAlign: "center" ,color: "#3F4756"}}>매칭 리스트</h2>
        {memberDatas.map((memberData) => (
          <div key={memberData.matchId} css={t.matchCardBox}>
            <div css={t.matchCardLeft}>
              <div style={{display: "flex" }}>
              <strong style={{color: "#3F4756"}}>회원 번호: </strong> <p> {memberData.memberId}</p>
              </div>
              <div style={{display: "flex"}}>
              <strong style={{color: "#3F4756"}}>회원 성별: </strong> <p> {memberData.memberGender}</p>
              </div>
            </div>

            <div css={t.matchCardMiddle}>
              <div style={{display: "flex"}}>
                <strong style={{color: "#3F4756"}}>회원 이름: </strong> <p> {memberData.memberName}</p>
              </div>
            </div>

            <div css={t.matchCardRight}>
              <button onClick={() => getMemberData(memberData.matchId)}>
                조회하기
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
      </div>

      {isModalOpen && modalData && (
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={modalFormData}
          data={modalData}
        />
      )}
    </div>
  );
}

export default ReadTrainerMatchList;
