import React from 'react'

function MemberCouponLIst() {
  


  return (
    <div>
      <div className="memberCouponContainerBox">
    <p>쿠폰함</p>
    <div className="membercouponFilterTab">
      <button>사용가능 쿠폰</button> <button>기간 만료 쿠폰</button>
    </div>
    <div className="memberCouponListBox">
      <div className="memberCouponBox">
        <div className="memberCouponSectionLeft">
          <h4>쿠폰 번호</h4>
        </div>
        <div className="memberCouponSectionMiddle">
          <h4>유효기간</h4>
          <h4>쿠폰진행단계</h4>
        </div>
        <div className="memberCouponSectionRight">
          <p>프로필 이미지</p>
          <h4>트레이너 이름</h4>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default MemberCouponLIst