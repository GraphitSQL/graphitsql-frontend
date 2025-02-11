import { Text, TextProps } from '@chakra-ui/react';

type ErrorTextProps = TextProps & {
  children: React.ReactNode;
};
export const ErrorText: React.FC<ErrorTextProps> = ({ children, ...props }) => {
  return (
    <Text color={'#f87171'} {...props}>
      {children}
    </Text>
  );
};
