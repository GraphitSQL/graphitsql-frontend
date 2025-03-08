import { getContrastColor } from '@/common/helpers';
import { Avatar } from '@chakra-ui/react';

type UserAvatarProps = {
  bgColor: string;
  fallback: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ bgColor, fallback }) => {
  return (
    <Avatar.Root bgColor={bgColor} color={getContrastColor(bgColor)}>
      <Avatar.Fallback name={fallback} />
    </Avatar.Root>
  );
};
