/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from "@emotion/react";
import * as f from './modal.form.style'
import { memberFormResponseDto } from '@/dtos/memberForm/response/get.memberForm.response.dto';
import FormViewer from '../memberForm/MemberFormView';
import { memberMatchResponseDto } from '@/dtos/match/response/find.member.match.response.dto';



interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: memberFormResponseDto;
  data: memberMatchResponseDto;
}


function FormModal({ isOpen, onClose, formData, data}: FormModalProps) {
  if (!isOpen || !data) return null;
  return (
    <div css={f.overlayStyle}>
      <div css={f.modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: "right" }}>X</button>
        <br />
        <div>
          이미지
        </div>
        <p>{data.memberName}</p>
        <p>{data.memberAge}</p>
        <p>{data.memberAddresss}</p>
        <p>{data.memberPhone}</p>
        { !formData ? <p>작성된 폼이 존재하지 않습니다.</p> : <FormViewer data={formData} />}
        </div>
    </div>
  )
}

export default FormModal