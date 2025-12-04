import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/layout/app-layout'
import { HomePage } from '@/pages/home'
import { ComparisonPage } from '@/pages/comparison'
import { InstancesPage } from '@/pages/instances'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/instances" element={<InstancesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
