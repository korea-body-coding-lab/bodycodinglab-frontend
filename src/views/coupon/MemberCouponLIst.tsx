/** @jsxImportSource @emotion/react */
import { findMemberCouponRequest } from "@/apis/coupon/find.member.coupon.api";
import { memberPutCouponRequest } from "@/apis/coupon/put.member.coupon.api";
import * as m from "./MemberCouponListStyle"
import { TrainerCouponResponseDto } from "@/dtos/coupon/response/trainer.coupon.response.dto";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../header/Header";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { getMenuTitleByPath } from "@/utils/menu.util";
import couponIcon from "@/assets/free-icon-coupon-6737610.png"

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

function MemberCouponLIst() {
  const [status, setStatus] = useState<CouponStatus>("NOT_USED");
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [coupons, setCoupons] = useState<TrainerCouponResponseDto[]>([]);
  // const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);

  const path = location.pathname;
    const menuTitle = getMenuTitleByPath(path);
  useEffect(() => {
    const fetchCoupons = async () => {

      const token = cookies.accessToken; 
    if (!token) {
      console.warn("Access token 없음. 인증된 사용자만 조회 가능합니다.");
      return;
    }


      const response = await findMemberCouponRequest(status, token);
      if (response && response.data) {
        setCoupons(response.data);
      }else(
        console.log("쿠폰이 없습니다")
      )
    };

    fetchCoupons();
  }, [status]);

  const handleStatusChange = (newStatus: CouponStatus) => {
    setStatus(newStatus);
  };

  const handleButtonEvent = async (couponId: number) => {
    const token = cookies.accessToken; 
    if (!token) {
      console.warn("Access token 없음. 인증된 사용자만 조회 가능합니다.");
      return;
    }
    const response = await memberPutCouponRequest(couponId, token);
    if (response.code === "SU") {
      alert("쿠폰 사용 신청이 완료되었습니다.");
      
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.couponId !== couponId)
      );
      
      return
    } else {
      alert("쿠폰 신청에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
  
      <div>
      <Header />
      </div>


      <div css={m.couponContainerBox}>
      <MyPageSidebar/>
      <div css={m.memberCouponContainer}>
        <br />
        <h2 style={{color: "#3F4756"}}>{menuTitle}</h2>
        <br />
        <div css={m.memberCouponFilterTab} >
          <button onClick={() => handleStatusChange("NOT_USED")} className={status === "NOT_USED" ? "active" : ""}>
            사용하지 않은 쿠폰
          </button>
          <button onClick={() => handleStatusChange("EXPIRED")}  className={status === "EXPIRED" ? "active" : ""}>
            기간 만료 쿠폰
          </button>
        </div>
      <div css={m.memberCouponContainerBox}>

        <div css={m.memberCouponListBox}>
          {coupons.length === 0 ? (
            <p>해당 상태의 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
              <div css={m.memberCouponBox}  key={coupon.couponId}>
                <div css={m.memberCouponSectionLeft}>
                  <h4>쿠폰 번호: {coupon.couponId}</h4>
                  <button onClick={()=> handleButtonEvent(coupon.couponId)}>사용 신청</button>
                </div>
                <div css={m.memberCouponSectionMiddle}>
                  <h4>유효기간: {coupon.expirationPeriod}</h4>
                  
                  <h4>진행단계: {coupon.status === "NOT_USED" ? "사용 가능" : "기만 만료"}</h4>
                </div>
                <div css={m.memberCouponSectionRight}>
                  <img src={couponIcon} alt="쿠폰 이미지"/>
                  <h4>{coupon.trainerName}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>

      </div>
    </div>
  );
}

export default MemberCouponLIst;
