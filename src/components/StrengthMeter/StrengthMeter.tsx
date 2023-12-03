import { checkPasswordStrength } from '../../utils/checkPasswordStrength';
import { setProgressColor } from '../../utils/setProgressColor';
import { setProgressLabel } from '../../utils/setProgressLabel';

import './StrengthMeter.scss';

const StrengthMeter = ({ password }: { password: string }) => {
  const changePasswordColor = () => ({
    width: `${checkPasswordStrength(password)}`,
    background: setProgressColor(password),
  });

  return (
    <div className="progress">
      <div className="progress-bar" style={changePasswordColor()}></div>
      <p style={{ color: setProgressColor(password) }}>
        {setProgressLabel(password)}
      </p>
    </div>
  );
};

export default StrengthMeter;
