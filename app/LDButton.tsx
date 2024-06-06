'use client';

import NextClient from '@/ld/nextClient';
import { useState } from 'react';

export default function LDButton() {
  const [flagValue, setFlagValue] = useState(false);

  const onClickButton = async () => {
    const v = await NextClient.get().variation('dev-test-flag', false);
    setFlagValue(v);
  };

  return <button onClick={onClickButton}>{flagValue.toString()}</button>;
}
