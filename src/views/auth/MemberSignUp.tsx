/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Header from '../header/Header';
import * as authStyle from '@/views/auth/auth.style';
import { SignUpMemberRequestDto } from '@/dtos/request/auth/sign-up-member.request.dto';
import { signUpMemberRequest } from '@/apis/auth/sign-up.api';
import { useNavigate } from 'react-router-dom';
import { validateMemberForm } from '@/utils/sign-up.valid';

function MemberSignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthdate: "",
    gender: "",
    phone: "",
    email: "",
    address: ""
  });
  const [profile, setProfile] = useState<File | null>(null);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password' || name === 'confirmPassword') setIsPasswordConfirmed(false);
  };
  
  const handleConfirmPassword = () => {
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirmed(false);
      return;
    } else {
      alert('비밀번호가 일치합니다.');
      setIsPasswordConfirmed(true);
      return;
    }
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfile(e.target.files[0]);
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateMemberForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (!isPasswordConfirmed) {
      alert('비밀번호 확인 버튼을 눌러주세요.');
      return;
    }
    
    const requestBody: SignUpMemberRequestDto = {
      ...form,
      gender: form.gender.toUpperCase()
    };

    const formData = new FormData();
    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    if (profile) formData.append('profile', profile);

    try {
      const response = await signUpMemberRequest(formData);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      alert('회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch(error) {
      alert('서버 오류로 인해 가입에 실패하였습니다.');
    }
    
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div css={authStyle.containerStyle}>
        <form onSubmit={handleSubmit} css={authStyle.formWrapperStyle}>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formTitleStyle}>기본 정보</h2>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>아이디</label>
              <div css={authStyle.inputWrapperStyle}>
                <input type="text" name='username' value={form.username} onChange={handleInputChange} css={authStyle.inputStyle} />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>비밀번호</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>비밀번호 확인</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="password"
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
                <button type="button" onClick={handleConfirmPassword} css={authStyle.inputButtonStyle}>
                  확인
                </button>
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>성명</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="text"
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>생년월일</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="date"
                  name='birthdate'
                  value={form.birthdate}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>성별</label>
              <div css={authStyle.genderSectionStyle}>
                <input
                  type="radio"
                  id='man'
                  name='gender'
                  value="man"
                  checked={form.gender === "man"}
                  onChange={handleInputChange}
                  css={authStyle.hiddenRadioStyle}
                />
                <label
                  htmlFor="man"
                  css={[authStyle.genderButtonStyle, form.gender === "man" && authStyle.genderSelectionStyle]}
                >
                  남성
                </label>

                <input
                  type="radio"
                  id='woman'
                  name='gender'
                  value="woman"
                  checked={form.gender === "woman"}
                  onChange={handleInputChange}
                  css={authStyle.hiddenRadioStyle}
                />
                <label
                  htmlFor="woman"
                  css={[authStyle.genderButtonStyle, form.gender === "woman" && authStyle.genderSelectionStyle]}
                >
                  여성
                </label>
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>휴대폰번호</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="text"
                  name='phone'
                  value={form.phone}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>이메일</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="email"
                  name='email'
                  value={form.email}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>
          </div>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formTitleStyle}>추가 정보</h2>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>주소</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="text"
                  name='address'
                  value={form.address}
                  onChange={handleInputChange}
                  css={authStyle.inputStyle}
                />
                <button css={authStyle.inputButtonStyle}>찾아보기</button>
              </div>
            </div>       
          </div>
          <div css={authStyle.formSectionStyle}>
            <h2 css={authStyle.formTitleStyle}>선택 정보</h2>
            <div css={authStyle.formStyle}>
              <label css={authStyle.formLabelStyle}>프로필 사진</label>
              <div css={authStyle.inputWrapperStyle}>
                <input
                  type="file"
                  name='profile'
                  onChange={handleProfileChange}
                  css={authStyle.inputStyle}
                />
              </div>
            </div>       
          </div>
          <button type='submit' css={authStyle.buttonStyle}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default MemberSignUp;