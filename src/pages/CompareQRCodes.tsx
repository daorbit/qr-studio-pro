import React from "react";
import { Card, Typography } from "antd";
import { GitCompare } from "lucide-react";
import { useQRCodes } from "@/hooks/useQRCodes";
import CompareQRCodes from "@/components/analytics/CompareQRCodes";

const { Title } = Typography;

const CompareQRCodesPage: React.FC = () => {
  const { qrCodes, loading } = useQRCodes();

  return (
    <>
      <CompareQRCodes qrCodes={qrCodes} loading={loading} />
    </>
  );
};

export default CompareQRCodesPage;
