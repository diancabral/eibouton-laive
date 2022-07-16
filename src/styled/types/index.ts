import { PartialDeep } from 'type-fest';
import { MyCustomType } from '../custom';
import { ThemeColors, ThemeSpacing } from './generated';

export type CustomThemeSpacing = ThemeSpacing | Record<string, string>;
export type CustomThemeColors = ThemeColors | Record<string, Record<string, string>>;
export type CustomThemeType = PartialDeep<{
  spacing: CustomThemeSpacing;
  colors: CustomThemeColors;
}> & MyCustomType;
