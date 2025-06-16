import { findTrainerCouponRequest } from '@/apis/coupon/find.trainer.coupon.api';
import { CouponStatus } from '@/dtos/response/coupon/copon.enum';
import { MemberCouponResponseDto } from '@/dtos/response/coupon/member.coupon.response.dto';
import React, { useEffect, useState } from 'react'

const TrainerCouponListView = () => {
  const [status, setStatus] = useState<CouponStatus>("APPLICATION");
  const [coupons, setCoupons] = useState<MemberCouponResponseDto[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await findTrainerCouponRequest(status);
      if (response && response.data) {
        setCoupons(response.data);
      }
    };

    fetchCoupons();
  }, [status]);

  const handleStatusChange = (status: CouponStatus) => {
    setStatus(status);
  };

function TrainerCouponList() {
  return (
    <div><div className="trainerCouponContainerBox">
    <p>쿠폰함</p>
    <div className="trainercouponFilterTab">
      <button>신청 대기 쿠폰</button> <button>사용 완료 쿠폰</button>
    </div>
    <div className="trainerCouponListBox">
      <div className="trainerCouponBox">
        <div className="trainerCouponSectionLeft">
          <h4>쿠폰 번호</h4>
          <button>사용 완료</button>
        </div>
        <div className="trainerCouponSectionMiddle">
          <h4>유효기간</h4>
          <h4>사용기간</h4>
          <h4>쿠폰진행단계</h4>
        </div>
        <div className="trainerCouponSectionRight">
          <p>이미지</p>
          <h4>회원 이름</h4>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default TrainerCouponList