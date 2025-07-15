create table interviews (
    id uuid primary key default gen_random_uuid(),
    job_id uuid not null references jobs(id),
    interview_date date not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);