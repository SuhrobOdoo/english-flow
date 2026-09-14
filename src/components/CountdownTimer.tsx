import React from 'react';

interface CountdownTimerProps {
  remaining: number;
  enabled: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  remaining,
  enabled,
}) => {
  if (!enabled || remaining <= 0) return null;

  return (
    <div className="countdown-timer" aria-label={`Next word in ${remaining} seconds`}>
      <div className="countdown-bar">
        <div className="countdown-text">{remaining}s</div>
      </div>
    </div>
  );
};
