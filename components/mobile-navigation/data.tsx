import {
	User,
	Briefcase,
	Code,
	Laptop,
	Contact,
	MessageSquareMore,
	MoreHorizontal,
} from 'lucide-react'
import { NavItemType } from './components/nav-item'

export const navigationItems = {
	primaryNavItems: [
		{ id: 'about', label: 'About', icon: User },
		{ id: 'experience', label: 'Experience', icon: Briefcase },
		{ id: 'skills', label: 'Skills', icon: Code },
		{ id: 'hire', label: 'Hire Me', icon: MessageSquareMore },
		{ id: 'more', label: 'More', icon: MoreHorizontal, isAction: true },
	] as NavItemType[],

	secondaryNavItems: [
		{ id: 'uses', label: 'Uses', icon: Laptop },
		{ id: 'connect', label: 'Connect', icon: Contact },
	] as NavItemType[],
}
