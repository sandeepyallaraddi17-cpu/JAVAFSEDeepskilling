export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  status: 'passed' | 'failed' | 'pending';
}