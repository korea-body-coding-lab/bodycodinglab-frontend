/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Header from '../header/Header';
import { buttonResetPasswordStyle, containerStyle, formLabelResetPasswordStyle, formSectionStyle, formStyle, formTitleStyle, formWrapperStyle, inputButtonStyle, inputFindUsernameWrapperStyle, inputStyle } from '../auth/auth.style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReapplyTrainerRequestDto } from '@/dtos/trainer/request/reapply-trainer.request.dto';
import { ReapplyTrainerRequest } from '@/apis/trainer/reapply-trainer.api';
import AddressModal from '../auth/AddressModal';
import { useCookies } from 'react-cookie';

function ReapplyTrainer() {
  const [cookies] = useCookies(["accessToken"]);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    jobAddress: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonecode, setZonecode] = useState<string>("");
  const [jobAddress, setJobAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const fullAddress = `${jobAddress} ${detailedAddress}`.trim();
  const accessToken = cookies.accessToken;
  
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      jobAddress: `${jobAddress} ${detailedAddress}`.trim()
    }));
  }, [jobAddress, detailedAddress]);
  
  const handleAddressComplete = (jobAddress: string, zonecode: string) => {
    setJobAddress(jobAddress);
    setZonecode(zonecode);
  };
  
  const handleDetailedAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
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

    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    formData.append('attachmentFile', attachmentFile);

    try {
      const response = await ReapplyTrainerRequest(formData, accessToken);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('트레이너 재신청이 완료되었습니다.');
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