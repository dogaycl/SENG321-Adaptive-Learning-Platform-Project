export enum Role {
    STUDENT = 'Student',
    INSTRUCTOR = 'Instructor',
    ADMIN = 'Admin'
}
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'INSTRUCTOR' | 'STUDENT';
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'test@edu.com',
    // Hash for 'password123'
    passwordHash: '$2b$10$6p2.A9U7vSjRkR0pE.XyO.v9P3B5O0j2QzX9m6f8f8f8f8f8f8f8f', 
    role: 'INSTRUCTOR'
  },
  {
    id: '2',
    email: 'student@edu.com',
    // Hash for 'password123'
    passwordHash: '$2b$10$6p2.A9U7vSjRkR0pE.XyO.v9P3B5O0j2QzX9m6f8f8f8f8f8f8f8f', 
    role: 'STUDENT'
  }
];