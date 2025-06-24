/** @jsxImportSource @emotion/react */
import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { closeButtonStyle, modalStyle, overlayStyle } from './auth.style';

interface AddressModalProps {
  onClose: () => void;
  onComplete: (address: string, zonecode: string) => void;
}

const AddressModal = ({ onClose, onComplete }: AddressModalProps) => {
  const handleComplete = (data: any) => {
    const { address, zonecode } = data;
    onComplete(address, zonecode);
    onClose();
  };

  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <button onClick={onClose} css={closeButtonStyle}>X</button>
        <DaumPostcodeEmbed
          onComplete={handleComplete} 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default AddressModal;