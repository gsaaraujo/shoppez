import React, { useState } from 'react';

import { theme } from '../../global/theme/styles';

import EyeOnSvg from '../../assets/images/eye-on.svg';
import EyeOffSvg from '../../assets/images/eye-off.svg';

import { Container, Box, Title, TextInput, Wrapper } from './styles';
import { useEffect } from 'react';

type Props = {
  title: string;
  value: string;
  isWarning?: boolean;
  hasIcon?: boolean;
  handleOnChangeText: (value: string) => void;
};

export const CredentialInput = ({
  title,
  value,
  isWarning = false,
  hasIcon = false,
  handleOnChangeText,
}: Props) => {
  const { primaryDark, border, warning } = theme.colors;

  const [isEyeOn, setIsEyeOn] = useState(false);
  const [isSecureText, setIsSecureText] = useState(hasIcon);
  const [isHighlight, setIsHighlight] = useState(border);

  useEffect(() => {
    handleIsWarning(isWarning);
  }, [isWarning]);

  const handleIsEyeOff = () => setIsEyeOn(!isEyeOn);
  const handleIsSecureText = () => setIsSecureText(!isSecureText);

  const handleOnBlur = () => {
    const hasValue = !!value;
    const isWarningFalse = !isWarning;

    if (isWarningFalse) {
      hasValue ? setIsHighlight(primaryDark) : setIsHighlight(border);
    }
  };

  const handleOnFocus = () => {
    const isWarningFalse = !isWarning;

    if (isWarningFalse) {
      setIsHighlight(primaryDark);
    }
  };

  const handleIsWarning = (state: boolean) => {
    state ? setIsHighlight(warning) : setIsHighlight(border);
  };

  return (
    <Container highLight={isHighlight}>
      <Box>
        <Title highLight={isHighlight}>{title}</Title>
      </Box>

      <TextInput
        maxLength={40}
        secureTextEntry={isSecureText}
        onChangeText={handleOnChangeText}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />

      {hasIcon && (
        <Wrapper
          onPress={() => {
            handleIsEyeOff(), handleIsSecureText();
          }}
          hitSlop={25}>
          {isEyeOn ? <EyeOnSvg /> : <EyeOffSvg />}
        </Wrapper>
      )}
    </Container>
  );
};
