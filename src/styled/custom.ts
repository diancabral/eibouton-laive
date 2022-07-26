import colors from 'material-colors';
import { darken } from 'polished';
import { CustomThemeType } from './types';

const custom: CustomThemeType = {
  colors: {
    containers: {
      background: darken(0.05, colors.grey[700]),
      borderLight: colors.grey[900]
    },
  },
  borderRadius: {
    sm: '4px'
  },
}

export default custom;
