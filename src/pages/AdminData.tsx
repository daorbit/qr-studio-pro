import React from 'react';
import AdminDataComponent from '@/components/admin/AdminData';

const AdminDataPage: React.FC = () => {
  return (
    <>
      <div className="animate-fade-in space-y-4 md:space-y-6">
        <AdminDataComponent />
      </div>
    </>
  );
};

export default AdminDataPage;