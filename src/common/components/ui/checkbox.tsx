import { Checkbox as ChakraCheckbox, HStack, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { ErrorText } from './error-text';

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
  errorText?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, errorText, ...rest } = props;
    return (
      <ChakraCheckbox.Root ref={rootRef} {...rest}>
        <VStack alignItems={'start'}>
          <HStack>
            <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
            <ChakraCheckbox.Control>
              {icon || <ChakraCheckbox.Indicator />}
            </ChakraCheckbox.Control>
            {children != null && (
              <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
            )}
          </HStack>
          {errorText && <ErrorText fontSize={'xs'}>{errorText}</ErrorText>}
        </VStack>
      </ChakraCheckbox.Root>
    );
  }
);
