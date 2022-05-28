export interface Subject {
  event: Event;
  eventId: number;
  id: number;
  status: string;
  teamId: number;
}

export interface Defence {
  id: number;
  event: Event;
  eventId: number;
  team: Team;
  teamId: number;
  userGrade: Grade;
  userGradeId: number;
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
export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'id',
    type: 'text',
    label: 'First Name',
    required: true,
  },
  {
    key: 'userId',
    type: 'text',
    label: 'Last Name',
    required: true,
  },
  {
    key: 'grade',
    type: 'text',
    label: 'Grade',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
