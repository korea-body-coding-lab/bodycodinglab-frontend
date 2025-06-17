/** @jsxImportSource @emotion/react */
import { findTrainerCouponRequest } from "@/apis/coupon/find.trainer.coupon.api";
import { trainerPutCouponRequest } from "@/apis/coupon/put.trainer.coupon.api";
import { PutCouponRequestDto } from "@/dtos/coupon/request/put.Coupon.Request.Dto";
import { MemberCouponResponseDto } from "@/dtos/coupon/response/member.coupon.response.dto";
import React, { useEffect, useState } from "react";
import * as s from "./TrainerCouponModalStyle";
import * as t from "./TrainerCouponListStyle"
import { useCookies } from "react-cookie";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

function TrainerCouponList() {
  const [status, setStatus] = useState<CouponStatus>("APPLICATION");
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [coupons, setCoupons] = useState<MemberCouponResponseDto[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [usedDate, setUsedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {

      const token = cookies.accessToken; 
    if (!token) {
      console.warn("Access token 없음. 인증된 사용자만 조회 가능합니다.");
      return;
    }

      const response = await findTrainerCouponRequest(status, token);
      console.log(response)
      if (response && response.data) {
        setCoupons(response.data);
      } else{
        console.log("데이터가 안 불러와짐 않음");
      }
    };

    fetchCoupons();
  }, [status]);

  const handleStatusChange = (newStatus: CouponStatus) => {
    setStatus(newStatus);
  };

  const handleOpenModal = (couponId: number) => {
    setSelectedCouponId(couponId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCouponId(null);
    setUsedDate("");
  };

  const handleConfirm = async () => {
      const token = cookies.accessToken; 
      if (!token) {
      console.warn("Access token 없음. 인증된 사용자만 조회 가능합니다.");
      return;
    }

    if (!selectedCouponId || !usedDate) return;
    const dto: PutCouponRequestDto = { usedDate };

    const response = await trainerPutCouponRequest(dto, selectedCouponId, token);
    if (response.code === "SU") {
      alert("쿠폰 사용 완료처리 되었습니다.")
      handleCloseModal();
      setStatus("COMPLETE");
    } else{
      alert("쿠폰 사용 완료 처리에 실패했습니다.")
    }
  };

  return (
    <div>
      <div css={t.trainerCouponContainer}>
        <br />
        <p>쿠폰함</p>
        <br />
        <div css={t.couponFilterTab}>
          <button onClick={() => handleStatusChange("APPLICATION")}>
            신청 대기 쿠폰
          </button>
          <button onClick={() => handleStatusChange("COMPLETE")}>
            사용 완료 쿠폰
          </button>
        </div>
      <div css={t.trainerCouponContainerBox}>


        <div css={t.trainerCouponListBox}>
          {coupons.length === 0 ? (
            <p>해당 상태의 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
              <div css={t.trainerCouponBox} key={coupon.couponId}>
                <div css={t.trainerCouponSectionLeft}>
                  <h4>쿠폰 번호: {coupon.couponId}</h4>
                  {
                    coupon.status === "APPLICATION" ? 
                    <button onClick={() => handleOpenModal(coupon.couponId)}>
                    사용완료
                  </button> : null
                  }
                  
                
                </div>
                <div css={t.trainerCouponSectionMiddle}>
                  <h4>유효기간: {coupon.expirationPeriod}</h4>
                  <h4>사용기간: {coupon.usedDate ?? "미사용"}</h4>
                  <h4>진행 단계: {coupon.status ==="APPLICATION" ? "신청 대기" : "사용 완료"}</h4>
                </div>
                <div css={t.trainerCouponSectionRight}>
                  <p>이미지</p>
                  <h4>{coupon.memberName}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>

      {showModal && (
        <div css={s.trainerCouponModalOverlay}>
          <div css={s.trainerCouponModalContent}>
            <h3>쿠폰 사용 날짜 입력</h3>
            <input
              type="date"
              value={usedDate}
              placeholder="xxxx-xx-xx"
              onChange={(e) => setUsedDate(e.target.value)}
            />
            <div css={s.trainerCouponModalButtons}>
              <button onClick={handleCloseModal}>취소</button>
              <button onClick={handleConfirm}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerCouponList;
