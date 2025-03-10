import React from 'react';
import { isMobile } from 'react-device-detect';
import { ProjectPage } from './project-page';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/common/components/ui/dialog';
import { Button, Text } from '@chakra-ui/react';

export class ProjectPageWrapper extends React.Component {
  renderContent = () => {
    if (isMobile) {
      return (
        <>
          <DialogRoot placement="center" motionPreset="slide-in-bottom" open={true} present>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Контент недоступен</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Text fontSize={'11px'} color={'DarkGray'}>
                  К сожалению, создание ER диаграмм недоступно на мобильных устройствах. Это связано с тем, что
                  интерфейс и функциональность для работы с диаграммами требуют большего экрана и точности, которые
                  могут быть обеспечены только на настольных компьютерах. <br />
                  Пожалуйста, используйте настольный компьютер для доступа к этой странице.
                </Text>
              </DialogBody>
              <DialogFooter margin={'0 auto'}>
                <Button onClick={() => window.location.replace('/home')}>На главную</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </>
      );
    }
    return <ProjectPage />;
  };
  render() {
    return this.renderContent();
  }
}
