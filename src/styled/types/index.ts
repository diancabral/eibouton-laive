import { PartialDeep } from 'type-fest';
import { MyCustomType } from './generated';

export type CustomThemeSpacing = Record<string, string>;
export type CustomThemeColors = Record<string, Record<string, string>>;
export type CustomThemeType = PartialDeep<{
  spacing: CustomThemeSpacing;
  colors: CustomThemeColors;
}> & MyCustomType;
