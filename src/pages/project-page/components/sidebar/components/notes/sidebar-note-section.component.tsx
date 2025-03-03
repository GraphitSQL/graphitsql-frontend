import { AccordionItemContent } from '@/common/components';
import { NoteSectionHeader } from './section-header.component';
import { SidebarNotes } from './sidebar-notes/sidebar-notes.component';
import { useEffect, useState } from 'react';
import { ProjectNote } from '@/pages/project-page/types';
import { MOCK_NOTES } from '@/tmp/mocks/mock-notes.mock';

export const SidebarNoteSection: React.FC = () => {
  const [notes, setNotes] = useState<ProjectNote[]>([]);

  const mockFetchNotes = async () => {
    const res = await new Promise<Array<ProjectNote>>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NOTES);
      }, 2000);
    });
    setNotes(res);
  };

  const handleDeleteNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    mockFetchNotes();
  }, []);

  return (
    <>
      <NoteSectionHeader handleDeleteNotes={handleDeleteNotes} />

      <AccordionItemContent>
        <SidebarNotes notes={notes} setNotes={setNotes} />
      </AccordionItemContent>
    </>
  );
};
