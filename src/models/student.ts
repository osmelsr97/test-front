import { Grade } from "./grade";

export interface Student {
    id?: string;
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    grade: Grade,
}