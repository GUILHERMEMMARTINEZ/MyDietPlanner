"use client";
import { Suspense } from 'react';
import SetupDietContent from '../../components/SetupDietContent';

const SetupDietPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetupDietContent />
    </Suspense>
  );
};

export default SetupDietPage;
