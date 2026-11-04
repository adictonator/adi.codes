import {
	User,
	Briefcase,
	Code,
	Laptop,
	Contact,
	FolderGit2,
	MessageSquareMore,
	MoreHorizontal,
	NotebookPen,
} from 'lucide-react'
import { NavItemType } from './components/nav-item'

// The four things a recruiter on a phone looks for get the bottom bar;
// everything else lives under "More".
export const navigationItems = {
	primaryNavItems: [
		{ id: 'about', label: 'About', icon: User },
		{ id: 'lab', label: 'Projects', icon: FolderGit2 },
		{ id: 'experience', label: 'Experience', icon: Briefcase },
		{ id: 'hire', label: 'Hire Me', icon: MessageSquareMore },
		{ id: 'more', label: 'More', icon: MoreHorizontal, isAction: true },
	] as NavItemType[],

	secondaryNavItems: [
		{ id: 'skills', label: 'Skills', icon: Code },
		{ id: 'blog', label: 'Notes', icon: NotebookPen },
		{ id: 'uses', label: 'Uses', icon: Laptop },
		{ id: 'connect', label: 'Social', icon: Contact },
	] as NavItemType[],
}
