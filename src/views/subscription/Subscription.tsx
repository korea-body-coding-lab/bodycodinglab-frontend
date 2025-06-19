/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as m from "./subscription.style"
import { findSubscriptionRequest } from '@/apis/subscription/find.subscription.api';
import { subscriptionResponseDto } from '@/dtos/subscription/response/get.Subscription.response.dto';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';



function Subscription() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [subscriptionData, setSubscriptionData] = useState<subscriptionResponseDto | undefined>(undefined);
  const [loading, setLoding] = useState<boolean>(false);
  const navigete = useNavigate();

  useEffect(() => {
    const loadingSubscriptionData = async () => {
      setLoding(true);
      const token = cookies.accessToken;
      if(!token){
        setLoding(false);
        alert("접근 권한이 존재하지 않습니다.")
        navigete("/");
      }

      const response = await findSubscriptionRequest(token);
      setSubscriptionData(response.data);
      setLoding(false);
    }

    loadingSubscriptionData()
  }, [])

  if(loading) return <p>로딩 중입니다.</p>
  if(!subscriptionData) return <p>구독 신청 이력이 존재하지 않습니다.</p>
  return (
    <div>
    <h4 css={m.mypageCategory}>구독 관리</h4>
      <h1 css={m.subscriptionTitle} >핏메이트 온라인 티칭</h1>
      <div css={m.subscriptionContainer}>
      <div css={m.subscriptionLogBox}>
   
        <div css={m.memberNameBox}>
          <p>사용자명: </p>
          <p>{subscriptionData.memberName}</p>
        </div>
          <hr />
        <div css={m.priceBox}>
          <p>결제 금액: </p>
          <p>{subscriptionData.price}</p>
        </div>
          <hr />
        <div css={m.paymentDateBox}>
          <p>결제 일자: </p>
          <p>{subscriptionData.paymentDate}</p>
        </div>
          <hr />
        <div css={m.paymentStatusBox}>
          <p>구독 상태: </p>
          <p>{subscriptionData.status}</p>
        </div>
      
      </div>
      </div>

    </div>
  )
}

export default Subscription