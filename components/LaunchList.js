'use client';

import { useState } from 'react';
import LaunchCard from '@/components/LaunchCard';
import Modal from '@/components/ui/Modal';
import LaunchDetails from './LaunchDetails';

export default function LaunchList({ launch }) {
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLaunch(null);
  };

  return (
    <>
      <LaunchCard
        key={launch.id}
        launch={launch}
        onClick={() => handleCardClick(launch)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        launch={selectedLaunch}
      >
        <LaunchDetails launch={launch} />
      </Modal>
    </>
  );
}
