'use client';
import React, { ReactNode, useState } from 'react';

interface HoveredTooltipProps {
  content: ReactNode;
}

const HoveredTooltip: React.FC<HoveredTooltipProps & { children: ReactNode }> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='cursor-pointer'
      >
        {children}
      </div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none transition-all duration-200 ${
          visible ? 'opacity-100 -translate-y-1' : 'opacity-0 -translate-y-3'
        }`}
        style={{ minWidth: 'max-content' }}
      >
        <div className='font-normal max-w-[224px] bg-[#070301] text-white text-sm p-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(219,204,168,0.35)] relative'>
          {content}
          <div className='absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#070301]' />
        </div>
      </div>
    </div>
  );
};

export default HoveredTooltip;
