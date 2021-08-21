import React, { useState } from 'react';

import { theme } from '../../global/theme/styles';

import EyeOnSvg from '../../assets/images/eye-on.svg';
import EyeOffSvg from '../../assets/images/eye-off.svg';

import { Container, TitleContent, Title, TextInput, Wrapper } from './styles';
import { useEffect } from 'react';

type Props = {
  testID?: string;
  title: string;
  value: string;
  isWarning?: boolean;
  hasIcon?: boolean;
  handleOnChangeText: (value: string) => void;
};

export const CredentialInput = ({
  testID,
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

  useEffect(() => {
    setIsHighlight(border);
  }, []);

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
    state ? setIsHighlight(warning) : setIsHighlight(primaryDark);
  };

  return (
    <Container highLight={isHighlight} testID={testID}>
      <TitleContent>
        <Title highLight={isHighlight}>{title}</Title>
      </TitleContent>

      <TextInput
        testID='TextInput'
        maxLength={40}
        secureTextEntry={isSecureText}
        autoCapitalize='none'
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
