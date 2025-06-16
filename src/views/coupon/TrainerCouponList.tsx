/** @jsxImportSource @emotion/react */
import { findTrainerCouponRequest } from "@/apis/coupon/find.trainer.coupon.api";
import { trainerPutCouponRequest } from "@/apis/coupon/put.trainer.coupon.api";
import { PutCouponRequestDto } from "@/dtos/coupon/request/put.Coupon.Request.Dto";
import { MemberCouponResponseDto } from "@/dtos/coupon/response/member.coupon.response.dto";
import React, { useEffect, useState } from "react";
import * as s from "./TrainerCouponModalStyle";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

function TrainerCouponList() {
  const [status, setStatus] = useState<CouponStatus>("APPLICATION");
  const [coupons, setCoupons] = useState<MemberCouponResponseDto[]>([]);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [usedDate, setUsedDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await findTrainerCouponRequest(status);
      if (response && response.data) {
        setCoupons(response.data);
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
    if (!selectedCouponId || !usedDate) return;
    const dto: PutCouponRequestDto = { usedDate };

    const response = await trainerPutCouponRequest(dto, selectedCouponId);
    if (response) {
      handleCloseModal();
      setStatus("COMPLETE");
    }
  };

  return (
    <div>
      <div className="trainerCouponContainerBox">
        <p>쿠폰함</p>

        <div className="trainercouponFilterTab">
          <button onClick={() => handleStatusChange("APPLICATION")}>
            신청 대기 쿠폰
          </button>
          <button onClick={() => handleStatusChange("COMPLETE")}>
            사용 완료 쿠폰
          </button>
        </div>

        <div className="trainerCouponListBox">
          {coupons.length === 0 ? (
            <p>해당 상태의 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
              <div className="trainerCouponBox" key={coupon.couponId}>
                <div className="trainerCouponSectionLeft">
                  <h4>쿠폰 번호: {coupon.couponId}</h4>
                  <button onClick={() => handleOpenModal(coupon.couponId)}>
                    사용완료
                  </button>
                </div>
                <div className="trainerCouponSectionMiddle">
                  <h4>유효기간: {coupon.expirationPeriod}</h4>
                  <h4>사용기간: {coupon.usedDate ?? "미사용"}</h4>
                  <h4>진행 단계: {coupon.status}</h4>
                </div>
                <div className="trainerCouponSectionRight">
                  <p>이미지</p>
                  <h4>{coupon.memberName}</h4>
                </div>
              </div>
            ))
          )}
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
