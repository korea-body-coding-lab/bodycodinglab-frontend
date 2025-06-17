import { findMemberCouponRequest } from "@/apis/coupon/find.member.coupon.api";
// import { memberPutCouponRequest } from "@/apis/coupon/put.member.coupon.api";

import { TrainerCouponResponseDto } from "@/dtos/coupon/response/trainer.coupon.response.dto";
import React, { useEffect, useState } from "react";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

function MemberCouponLIst() {
  const [status, setStatus] = useState<CouponStatus>("NOT_USED");
  const [coupons, setCoupons] = useState<TrainerCouponResponseDto[]>([]);
  // const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await findMemberCouponRequest(status);
      if (response && response.data) {
        setCoupons(response.data);
      }
    };

    fetchCoupons();
  }, [status]);

  const handleStatusChange = (newStatus: CouponStatus) => {
    setStatus(newStatus);
  };

  // const handleButtonEvent = (couponId: number) => {
  //   const response = await memberPutCouponRequest(couponId);
  // }
  return (
    <div>
      <div className="memberCouponContainerBox">
        <p>쿠폰함</p>

        <div className="membercouponFilterTab">
          <button onClick={() => handleStatusChange("NOT_USED")}>
            신청 대기 쿠폰
          </button>
          <button onClick={() => handleStatusChange("EXPIRED")}>
            사용 완료 쿠폰
          </button>
        </div>
        <div className="memberCouponListBox">
          {coupons.length === 0 ? (
            <p>해당 상태의 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
              <div className="memberCouponBox" key={coupon.couponId}>
                <div className="memberCouponSectionLeft">
                  <h4>쿠폰 번호: {coupon.couponId}</h4>
                  <button>사용 신청</button>
                </div>
                <div className="memberCouponSectionMiddle">
                  <h4>유효기간: {coupon.expirationPeriod}</h4>
                  <h4>진행단계: {coupon.status}</h4>
                </div>
                <div className="memberCouponSectionRight">
                  <p>이미지</p>
                  <h4>{coupon.trainerName}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberCouponLIst;
