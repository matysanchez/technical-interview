export interface ILocationInterface {
    lat: number;
    lon: number;
    coordinates: [number, number];
}


export interface IEduLevel {
    value: string;
    id?: string;
}


export interface IJob {
    _id: string;
    body: string;
    career_area_name: string;
    city_name: string;
    company_name: string;
    company_raw: string;
    edulevels_name: EduLevel[];
    employment_type_name: string;
    location: LocationInterface;
    max_salary: number;
    min_edulevels_name: string;
    min_salary: number;
    min_years_experience: number;
    onet: string;
    onet_name: string;
    posted: Date;
    remote_type: number;
    remote_type_name: string;
    riasec: string[];
    salary: number;
    skills_name: { value: string }[];
    title_name: string;
    title_raw: string;
    is_earn_and_learn: boolean;
    is_gateway_job: boolean;
    url: { value: string }[];
    score: number;
    expiredAt: Date | null;
}