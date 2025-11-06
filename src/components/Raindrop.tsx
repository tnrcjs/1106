import { Raindrop as RaindropType } from '../types';

interface RaindropProps {
  raindrop: RaindropType;
}

function Raindrop({ raindrop }: RaindropProps) {
  return (
    <div
      className="raindrop"
      style={{
        left: `${raindrop.x}px`,
        top: `${raindrop.y}px`,
      }}
    >
      <div className="raindrop-content">
        {raindrop.num1} × {raindrop.num2}
      </div>
    </div>
  );
}

export default Raindrop;

