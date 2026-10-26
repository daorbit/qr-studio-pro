import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '@mantine/core';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from './DashboardLayout';

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Loader size="sm" />
  </div>
);

const AppShell: React.FC = () => (
  <ProtectedRoute>
    <DashboardLayout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  </ProtectedRoute>
);

export default AppShell;
