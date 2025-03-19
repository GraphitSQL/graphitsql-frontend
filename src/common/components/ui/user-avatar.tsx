import { getContrastColor } from '@/common/helpers';
import { Avatar, AvatarRootProps } from '@chakra-ui/react';

type UserAvatarProps = {
  bgColor?: string;
  fallback?: string;
};

export const UserAvatar: React.FC<UserAvatarProps & AvatarRootProps> = ({
  bgColor = '(232, 236, 241, 1)',
  fallback = 'Undefined',
  size,
}) => {
  return (
    <Avatar.Root bgColor={bgColor} color={getContrastColor(bgColor)} size={size || 'md'}>
      <Avatar.Fallback name={fallback} />
    </Avatar.Root>
  );
};
