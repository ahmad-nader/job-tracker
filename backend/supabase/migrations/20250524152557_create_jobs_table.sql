create table jobs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    company_name text not null,
    salary_range text,
    location text,
    experience_level text,
    benefits text,
    link text,
    stage text,
    status text,
    potential_red_flags text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);