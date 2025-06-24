/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Header from '../header/Header';
import { buttonResetPasswordStyle, containerStyle, formLabelResetPasswordStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputButtonStyle, inputFindUsernameWrapperStyle, inputStyle } from './auth.style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReapplyTrainerRequestDto } from '@/dtos/auth/request/reapply-trainer.request.dto';
import { ReapplyTrainerRequest } from '@/apis/auth/reapply-trainer.api';
import { VerifyEmailRequest } from '@/apis/auth/verify-email.api';
import AddressModal from './AddressModal';

function ReapplyTrainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    jobAddress: ""
  });
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonecode, setZonecode] = useState<string>("");
  const [jobAddress, setJobAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const fullAddress = `${jobAddress} ${detailedAddress}`.trim();
  const token = searchParams.get('token');
  
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      jobAddress: `${jobAddress} ${detailedAddress}`.trim()
    }));
  }, [jobAddress, detailedAddress]);
  
    
  useEffect(() =>{
    verifyEmail();
  }, [token]);
  
  
  if (!token) {
    alert('잘못된 토큰입니다.');
    return;
  }
  
  const handleAddressComplete = (jobAddress: string, zonecode: string) => {
    setJobAddress(jobAddress);
    setZonecode(zonecode);
  };
  
  const handleDetailedAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
  };


  const verifyEmail = async() => {
    try {
      const response = await VerifyEmailRequest(token);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }
      console.log('이메일 인증 성공: ' + message);

    } catch (e) {
      console.log('이메일 인증 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
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

    if (!attachmentFile) {
      alert('첨부 파일은 필수 항목입니다.');
      return;
    }

    const requestBody: ReapplyTrainerRequestDto = {
      ...form,
      jobAddress: fullAddress
    };
    
    const formData = new FormData();

    formData.append('token', token);
    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    formData.append('attachmentFile', attachmentFile);

    try {
      const response = await ReapplyTrainerRequest(token, formData);
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
                  value={jobAddress}
                  readOnly
                  css={inputStyle}
                />
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  css={inputButtonStyle}
                >
                  주소 찾기
                </button>
              </div>
              {isModalOpen && (
                <AddressModal
                  onClose={() => setIsModalOpen(false)}
                  onComplete={handleAddressComplete}
                />
              )}
            </div>
            <div css={formStyle}>
              <label css={formLabelResetPasswordStyle}>상세 주소</label>
              <div css={inputFindUsernameWrapperStyle}>
                <input
                  type="text"
                  value={detailedAddress}
                  onChange={handleDetailedAddressChange}
                  css={inputStyle}
                />
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