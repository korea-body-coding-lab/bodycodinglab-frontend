/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as m from "./subscription.style"
import { findSubscriptionRequest } from '@/apis/subscription/find.subscription.api';
import { subscriptionResponseDto } from '@/dtos/subscription/response/get.Subscription.response.dto';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import MyPageSidebar from "../sidebar/MyPageSidebar";



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
  if(!subscriptionData) return( <div>
    
      <div>
        <Header/>
      </div>

      <div style={{display: "flex"}}>
        <MyPageSidebar/> 
        <div style={{marginTop: "25px"}}>
          <h2 style={{color: "#3F4756"}}>구독 관리</h2>
          <br />
          <p>구독 신청 이력이 존재하지 않습니다.</p>
        </div>
      </div>
    </div>);
  return (
    <div>
      <div>
      <Header/>
      </div>
    
      <div css={m.subscriptionContainer}>
        <MyPageSidebar/>
        <div style={{display: "flex", flexDirection: "column", marginLeft: "15px", marginTop: "20px"}}>
      <h2  style={{color: "#3F4756"}}> 구독관리</h2> 
      <div css={m.subscriptionContainerBox}>
      <h2 css={m.subscriptionTitle} style={{color: "#3F4756"}}>핏메이트 온라인 티칭</h2>
      <div css={m.subscriptionLogBox}>
        <div css={m.memberNameBox}>
          <p  style={{color: "#3F4756"}}>사용자명: </p>
          <p>{subscriptionData.memberName}</p>
        </div>
          <hr />
        <div css={m.priceBox}>
          <p  style={{color: "#3F4756"}}>결제 금액: </p>
          <p>{subscriptionData.price}원</p>
        </div>
          <hr />
        <div css={m.paymentDateBox}>
          <p  style={{color: "#3F4756"}}>결제 일자: </p>
          <p>{new Date(subscriptionData.paymentDate).toLocaleString("ko-kR", {
            year: "numeric",
            month: "long",
            day:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12: true
          })}</p>
        </div>
          <hr />
        <div css={m.paymentStatusBox}>
          <p  style={{color: "#3F4756"}}>구독 상태: </p>
          <p>{subscriptionData.status}</p>
        </div>
      
      </div>
      </div>
          
        </div>
        
      </div>

    </div>
  )
}

export default Subscription