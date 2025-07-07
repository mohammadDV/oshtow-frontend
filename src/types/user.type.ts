import { Project } from "./project.type";

export interface UserInfo {
    id: number;
    nickname: string;
    biography: string | null;
    profile_photo_path: string;
    bg_photo_path: string | null;
    rate: number;
    point: number | null
}

export interface UserInfoResponse {
    user: UserInfo;
    sender_projects: Project[];
    passenger_projects: Project[];
    sender_projects_count: number;
    passenger_projects_count: number;
}

export interface VerificationService {
    verify_email: boolean;
    verify_access: boolean;
    user: UserInfo;
}