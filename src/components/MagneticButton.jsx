import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Wraps its children (typically a button/link) with a subtle magnetic
 * pull toward the cursor on hover. Falls back to a static element
 * when reduced motion is requested.
 */
export default function MagneticButton({ children, className = '', reducedMotion = false, as: Tag = 'button', ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  if (reducedMotion) {
    return (
      <Tag className={className} data-cursor="hover" {...props}>
        {children}
      </Tag>
    );
  }

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[Tag] ?? motion.button;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      data-cursor="hover"
      {...props}
    >
      {children}
    </MotionTag>
  );
}
