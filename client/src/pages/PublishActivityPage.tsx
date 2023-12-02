import { useState } from 'react';

import Header from '../components/Header/Header';
import ActivityForm from '../components/ActivityForm/ActivityForm';

const PublishActivityPage = () => {
  // todo: use context
  const [showModal, setShowModal] = useState(false);

  const handleGoBack = () => {
    setShowModal(true);
  };

  const title = 'Publish Activity';

  return (
    <>
      <Header onGoBackClick={handleGoBack} title={title} />
      <ActivityForm showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default PublishActivityPage;
