export default function ZeusSky() {
  const orbs: {
    size: number;
    top: string;
    left: string;
    type: 'gold' | 'blue' | 'white';
    dur: number;
    delay: number;
    x: number;
    y: number;
    x2: number;
    y2: number;
  }[] = [
    { size: 240, top: '5%',  left: '60%', type: 'gold',  dur: 20, delay: 0,  x:  40, y: -80,  x2: -30, y2: -160 },
    { size: 180, top: '30%', left: '10%', type: 'blue',  dur: 26, delay: 4,  x: -20, y: -100, x2:  10, y2: -200 },
    { size: 300, top: '60%', left: '50%', type: 'white', dur: 32, delay: 8,  x:  60, y: -60,  x2: -40, y2: -120 },
    { size: 160, top: '15%', left: '25%', type: 'gold',  dur: 22, delay: 12, x: -50, y: -80,  x2:  20, y2: -160 },
    { size: 200, top: '75%', left: '75%', type: 'blue',  dur: 28, delay: 6,  x:  30, y: -100, x2: -10, y2: -180 },
    { size: 120, top: '45%', left: '85%', type: 'gold',  dur: 18, delay: 2,  x: -60, y: -70,  x2:  40, y2: -140 },
  ];

  const sparks: {
    height: number;
    top: string;
    left: string;
    dur: number;
    delay: number;
  }[] = [
    { height: 50, top: '8%',  left: '72%', dur: 2.2, delay: 0   },
    { height: 70, top: '20%', left: '35%', dur: 3.1, delay: 1.4 },
    { height: 40, top: '55%', left: '88%', dur: 1.9, delay: 2.8 },
    { height: 60, top: '12%', left: '18%', dur: 2.7, delay: 0.7 },
    { height: 80, top: '35%', left: '60%', dur: 3.4, delay: 3.5 },
    { height: 45, top: '70%', left: '42%', dur: 2.0, delay: 1.8 },
    { height: 55, top: '5%',  left: '50%', dur: 2.5, delay: 4.2 },
    { height: 65, top: '48%', left: '8%',  dur: 2.9, delay: 0.3 },
  ];

  return (
    <div className="zeus-sky" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`zeus-orb zeus-orb--${orb.type}`}
          style={{
            width:  orb.size,
            height: orb.size,
            top:    orb.top,
            left:   orb.left,
            ['--orb-dur']   : `${orb.dur}s`,
            ['--orb-delay'] : `${orb.delay}s`,
            ['--orb-x']     : `${orb.x}px`,
            ['--orb-y']     : `${orb.y}px`,
            ['--orb-x2']    : `${orb.x2}px`,
            ['--orb-y2']    : `${orb.y2}px`,
          } as React.CSSProperties}
        />
      ))}

      {sparks.map((spark, i) => (
        <div
          key={`spark-${i}`}
          className="zeus-spark"
          style={{
            height : spark.height,
            top    : spark.top,
            left   : spark.left,
            ['--spark-dur']    : `${spark.dur}s`,
            ['--spark-delay']  : `${spark.delay}s`,
            ['--spark-travel'] : `${spark.height * 2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}