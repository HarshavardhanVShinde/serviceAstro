create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  full_name text,
  plan text not null default 'free',
  created_at timestamp with time zone default now()
);

create table if not exists problems (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  difficulty text not null,
  description text not null,
  premium boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  problem_id uuid references problems(id) on delete cascade,
  language text not null,
  status text not null,
  runtime text,
  created_at timestamp with time zone default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  plan text not null,
  status text not null,
  current_period_end timestamp with time zone,
  razorpay_subscription_id text,
  created_at timestamp with time zone default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
