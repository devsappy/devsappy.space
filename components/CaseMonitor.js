"use client";

import { useState } from 'react';
import Monitor from '@/components/Monitor';

export default function CaseMonitor({ project }) {
  const [live, setLive] = useState(false);
  return (
    <div className="case-monitor">
      <div className="explorer-modes" role="group" aria-label="Preview">
        <button type="button" aria-pressed={!live} onClick={() => setLive(false)}>Recording</button>
        <button type="button" aria-pressed={live} onClick={() => setLive(true)}>Live site</button>
      </div>
      <Monitor key={live ? 'live' : 'rec'} project={project} active live={live} priority />
    </div>
  );
}
