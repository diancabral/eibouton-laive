import React, { useEffect, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import { FormLabel } from '../Label/Label';
import * as Styled from './styled';

type FormSelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  label?: string;
  theme?: Styled.FormSelectThemes;
  options: FormSelectOption[];
  value: string;
  onSelect: (value: string) => unknown;
};

export const FormSelect = ({ label, theme, options, onSelect, value }: FormSelectProps) => {
  const [active, setActive] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const getCurrentValue = options.filter((val) => val.value === currentValue);

  const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActive(!active);
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setCurrentValue(option);
    setActive(false);
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', () => {
      if (active) setActive(false);
    });
  }, [active]);

  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}
      <Styled.Wrapper>
        <Styled.Value $theme={theme} onMouseDown={(e) => handleSelectClick(e)}>
          {(getCurrentValue[0] || {}).label}
          <Icon name="play_arrow" />
        </Styled.Value>
        {active && (
          <Styled.Row>
            {options.map((val) => (
              <Styled.List key={val.value} onMouseDown={() => handleOptionSelect(val.value)}>
                {val.label}
              </Styled.List>
            ))}
          </Styled.Row>
        )}
      </Styled.Wrapper>
    </div>
  );
};