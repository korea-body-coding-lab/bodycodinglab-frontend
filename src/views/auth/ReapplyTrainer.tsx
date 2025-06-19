/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Header from '../header/Header';
import { buttonResetPasswordStyle, containerStyle, formLabelResetPasswordStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputButtonStyle, inputFindUsernameWrapperStyle, inputStyle } from './auth.style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReapplyTrainerRequestDto } from '@/dtos/auth/request/reapply-trainer.request.dto';
import { ReapplyTrainerRequest } from '@/apis/auth/reapply-trainer.api';

function ReapplyTrainer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
    const [form, setForm] = useState({
      jobAddress: ""
    });

    const email = searchParams.get('email');

    if (!email) {
      alert('잘못된 이메일입니다.');
      return;
    }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setAttachmentFile(e.target.files[0]);
    };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    if (!form.jobAddress) {
      return "근무지 주소는 필수 항목입니다.";
    }

    // if (!attachmentFile) {
    //   alert('첨부 파일은 필수 항목입니다.');
    //   return;
    // }

    const requestBody: ReapplyTrainerRequestDto = {
          ...form,
    };
    
    const formData = new FormData();

    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    // formData.append('attachmentFile', attachmentFile);

    try {
      const response = await ReapplyTrainerRequest(email, formData);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('트레이너 재신청이 완료되었습니다.');
      navigate('/');
    } catch(e) {
      console.log('트레이너 재신청 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }

  }


  return (
    <>
      <div>
        <Header />
      </div>
      <div css={containerStyle}>
        <form css={formWrapperStyle}>
          <div css={formSectionStyle}>
            <h2 css={formTitleStyle}>트레이너 재신청</h2>
            <div css={formStyle}>
              <label css={formLabelResetPasswordStyle}>근무지 주소</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="text"
                  name="jobAddress"
                  value={form.jobAddress}
                  onChange={handleInputChange}
                  css={inputStyle}
                />
                <button css={inputButtonStyle}>찾아보기</button>
              </div>
            </div>
            <div css={formStyle}>
              <label css={formLabelResetPasswordStyle}>첨부파일</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="file"
                  name='attachmentFile'
                  onChange={handleAttachmentChange}
                  css={inputStyle}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              css={buttonResetPasswordStyle}
            >
              재신청
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReapplyTrainer;