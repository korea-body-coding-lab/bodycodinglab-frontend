import React, { useEffect, useState } from "react";
import { findMemberFormRequest } from "@/apis/memberForm/find.memberForm.api";
import { useCookies } from "react-cookie";
import FormViewer from "./MemberFormView";
import FormWriter from "./MemberFormWriter";
import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto";

const MemberFormPage = () => {
  const [formExists, setFormExists] = useState<boolean | null>(null);
  const [cookies] = useCookies(["accessToken"]);
  const [formData, setFormData] = useState<memberFormResponseDto | undefined>(undefined);

  useEffect(() => {
    const fetchForm = async () => {
      const token = cookies.accessToken;
      if (!token) return;

      const response = await findMemberFormRequest(token);
      if (response.code === "SU") {
        setFormExists(true);
        setFormData(response.data);
      } else {
        setFormExists(false);
      }
    };

    fetchForm();
  }, []);

  if (formExists === null) return <p>로딩 중...</p>;
  if (!formExists) return <FormWriter />;

  return <FormViewer data={formData!} />;
};

export default MemberFormPage;