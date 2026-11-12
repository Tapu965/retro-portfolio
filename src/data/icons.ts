import type { IconDef } from '../types/icon';
import {
  ReadMeIcon,
  AboutIcon,
  ProjectsIcon,
  SkillsIcon,
  ContactIcon,
  ResumeIcon,
} from '../components/icons';

export const DESKTOP_ICONS: IconDef[] = [
  {
    appKey: 'readme',
    label: 'ReadMe.txt',
    filename: 'README.TXT',
    Icon: ReadMeIcon,
    defaultSize: { width: 480, height: 360 },
  },
  {
    appKey: 'about',
    label: 'About.exe',
    filename: 'ABOUT.EXE',
    Icon: AboutIcon,
    defaultSize: { width: 520, height: 420 },
  },
  {
    appKey: 'projects',
    label: 'Projects.folder',
    filename: 'PROJECTS.FLD',
    Icon: ProjectsIcon,
    defaultSize: { width: 640, height: 460 },
  },
  {
    appKey: 'skills',
    label: 'Skills.sys',
    filename: 'SKILLS.SYS',
    Icon: SkillsIcon,
    defaultSize: { width: 520, height: 420 },
  },
  {
    appKey: 'contact',
    label: 'Contact.bat',
    filename: 'CONTACT.BAT',
    Icon: ContactIcon,
    defaultSize: { width: 480, height: 380 },
  },
  {
    appKey: 'resume',
    label: 'Resume.pdf',
    filename: 'RESUME.PDF',
    Icon: ResumeIcon,
    defaultSize: { width: 520, height: 480 },
  },
];
