export interface Subject {
  event: Event;
  eventId: number;
  id: number;
  status: string;
  teamId: number;
}

export interface Defence {
  'Pre-defense I': PreDefense[];
  'Pre-defense III': PreDefense[];
  'Pre-defense II': PreDefense[];
}
export interface PreDefense {
  id: number;
  user: User;
  userId: number;
  grade: string;
}

export interface Team {
  id: number;
  name: string;
  theme: string;
}

export interface TeamMember {
  id: number;
  user: User;
  userId: number;
  team: Team;
  teamId: number;
  role: string;
}

export interface Grade {
  id: number;
  user: User;
  userId: number;
  grade: string;
  isEdit: boolean;
}

export interface Event {
  id: number;
  name: string;
  time: Date;
  user: User;
  userId: number;
}

export interface User {
  id: number;
  isSelected: boolean;
  isEdit: boolean;
  role: string;
  firstname: string;
  lastname: string;
  phone: string;
  username: string;
  groupName: string;
  position: string;
  department: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export interface Creator {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  department: string;
  enabled: boolean;
  firstname: string;
  groupName: string;
  id: number;
  lastname: string;
  phone: string;
  position: string;
  role: string;
  username: string;
}

export interface PotentialTeam {
  creator: Creator;
  creatorId: number;
  id: number;
  status: string;
  user: Creator;
  userId: number;
  userRole: string;
}
