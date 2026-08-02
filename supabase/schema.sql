-- Jalankan keseluruhan fail ini dalam Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  reference_no text unique,
  district text not null,
  school_name text not null,
  participant1_name text not null,
  participant1_birth_cert text not null,
  participant1_parent_form text not null,
  participant1_media_form text not null,
  participant2_name text not null,
  participant2_birth_cert text not null,
  participant2_parent_form text not null,
  participant2_media_form text not null,
  teacher_name text not null,
  teacher_ic text not null check (teacher_ic ~ '^\d{6}-\d{2}-\d{4}$'),
  teacher_phone text not null check (teacher_phone ~ '^01\d-\d{7,8}$'),
  video_url text not null,
  status text not null default 'Menunggu Semakan' check (status in ('Menunggu Semakan','Lengkap','Tidak Lengkap','Diluluskan','Ditolak')),
  created_at timestamptz not null default now()
);

create sequence if not exists public.submission_reference_seq start 1;
create or replace function public.set_submission_reference() returns trigger language plpgsql security definer as $$
begin new.reference_no := 'PIDATO-' || extract(year from now())::int || '-' || lpad(nextval('public.submission_reference_seq')::text,4,'0'); return new; end $$;
drop trigger if exists set_submission_reference_trigger on public.submissions;
create trigger set_submission_reference_trigger before insert on public.submissions for each row execute function public.set_submission_reference();

alter table public.submissions enable row level security;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select coalesce((auth.jwt()->'app_metadata'->>'role')='admin',false) $$;
drop policy if exists "Public may submit" on public.submissions;
create policy "Public may submit" on public.submissions for insert to anon with check (status='Menunggu Semakan');
drop policy if exists "Public sees approved" on public.submissions;
create policy "Public sees approved" on public.submissions for select to anon using (status='Diluluskan');
drop policy if exists "Admin full access" on public.submissions;
create policy "Admin full access" on public.submissions for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values
('birth-certificates','birth-certificates',false,10485760,array['application/pdf','image/jpeg','image/png']),
('parent-consent','parent-consent',false,10485760,array['application/pdf']),
('media-consent','media-consent',false,10485760,array['application/pdf']),
('videos','videos',true,524288000,array['video/mp4'])
on conflict (id) do update set file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

-- Orang awam boleh memuat naik sahaja; admin boleh membaca/mengurus semua fail.
create policy "Anonymous uploads submission files" on storage.objects for insert to anon with check (bucket_id in ('birth-certificates','parent-consent','media-consent','videos'));
create policy "Admin manages submission files" on storage.objects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public watches approved videos" on storage.objects for select to anon using (bucket_id='videos');

-- Selepas mencipta pengguna admin di Authentication > Users, jalankan:
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb where email='admin@example.com';

