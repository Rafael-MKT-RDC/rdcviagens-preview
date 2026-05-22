interface WaveDividerProps {
  /** Color of the wave shape - should match the NEXT section's background */
  fill?: string;
  /** Background color behind the wave - should match the PREVIOUS section's background */
  bg?: string;
  /** Whether to flip vertically (use at bottom of section) */
  flip?: boolean;
  /** Wave variant for visual variety */
  variant?: "wave" | "curve" | "swell" | "tide";
  /** Additional CSS classes */
  className?: string;
  /** Height of the divider on desktop */
  height?: number;
  /** Height of the divider on mobile (defaults to half of height) */
  mobileHeight?: number;
}

const paths = {
  wave: "M0,64 C320,120 480,0 720,48 C960,96 1120,16 1440,64 L1440,160 L0,160 Z",
  curve: "M0,96 Q360,0 720,64 Q1080,128 1440,32 L1440,160 L0,160 Z",
  swell: "M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,160 L0,160 Z",
  tide: "M0,48 C180,96 360,0 540,64 C720,128 900,32 1080,80 C1260,128 1380,48 1440,64 L1440,160 L0,160 Z",
};

export default function WaveDivider({
  fill = "white",
  bg,
  flip = false,
  variant = "wave",
  className = "",
  height = 80,
  mobileHeight,
}: WaveDividerProps) {
  const mobile = mobileHeight ?? Math.round(height * 0.5);

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{
        marginTop: flip ? undefined : `-1px`,
        marginBottom: flip ? `-1px` : undefined,
        transform: flip ? "scaleY(-1)" : undefined,
        backgroundColor: bg || "transparent",
      }}
    >
      {/* Mobile height */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full md:hidden"
        style={{ height: `${mobile}px`, display: "block" }}
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
      {/* Desktop height */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full hidden md:block"
        style={{ height: `${height}px`, display: undefined }}
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
