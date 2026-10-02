"use client";

import { useEffect, useRef, useState } from 'react';

export default function CopyEmail({ email, className = '' }) {
  const [state, setState] = useState('idle');
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2200);
  };

  return (
    <button type="button" className={`copy ${className} is-${state}`} onClick={copy}>
      <span aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy it' : 'Copy email'}
      </span>
    </button>
  );
}
