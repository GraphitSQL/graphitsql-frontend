import { FC } from 'react';
import { memo } from 'react';

import { Heading, Text } from '@chakra-ui/react';

import { COLORS } from '@/common/constants';

import { StyledTitleContainer } from '../home-page.styled';

type TDatabasesInfoProps = {
  noDatabases: boolean;
  withSearch: boolean;
  dbCount: number;
};

const DatabasesInfo: FC<TDatabasesInfoProps> = ({ noDatabases, withSearch, dbCount }) => (
  <StyledTitleContainer>
    <Heading size={'3xl'}>Список баз даных</Heading>
    {!noDatabases && (
      <Text color={COLORS.gray[600]}>
        Всего {withSearch && 'найдено'} баз: {dbCount}
      </Text>
    )}
  </StyledTitleContainer>
);

export default memo(DatabasesInfo);
