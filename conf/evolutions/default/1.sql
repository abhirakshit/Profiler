# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table colleges (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  address                   text,
  website                   varchar(255),
  university_id             bigint,
  constraint uq_colleges_title unique (title),
  constraint pk_colleges primary key (id))
;

create table comments (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  comment                   text,
  creator_id                bigint,
  query_id                  bigint,
  constraint pk_comments primary key (id))
;

create table degrees (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  type                      varchar(255),
  constraint uq_degrees_title unique (title),
  constraint pk_degrees primary key (id))
;

create table departments (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  college_id                bigint,
  constraint uq_departments_title unique (title),
  constraint pk_departments primary key (id))
;

create table majors (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  school_prep               text,
  extra_curricular          text,
  admission                 text,
  career_connect            text,
  salary                    text,
  stream_id                 bigint,
  constraint uq_majors_title unique (title),
  constraint pk_majors primary key (id))
;

create table occupations (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  constraint uq_occupations_title unique (title),
  constraint pk_occupations primary key (id))
;

create table queries (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  creator_id                bigint,
  assigned_to               bigint,
  query_str                 text,
  status                    varchar(255),
  constraint pk_queries primary key (id))
;

create table schools (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  address                   text,
  website                   varchar(255),
  constraint uq_schools_title unique (title),
  constraint pk_schools primary key (id))
;

create table specializations (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  major_id                  bigint,
  constraint uq_specializations_title unique (title),
  constraint pk_specializations primary key (id))
;

create table streams (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  skills                    text,
  constraint uq_streams_title unique (title),
  constraint pk_streams primary key (id))
;

create table universities (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  title                     varchar(255),
  basic_info                text,
  address                   text,
  website                   varchar(255),
  constraint uq_universities_title unique (title),
  constraint pk_universities primary key (id))
;

create table users (
  id                        bigint not null,
  created_on                timestamp,
  modified_on               timestamp,
  email                     varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  password                  varchar(255),
  role_type                 varchar(255),
  active                    boolean,
  owner_id                  bigint,
  contact_number            varchar(255),
  address                   text,
  field_interested          varchar(255),
  country_interested        varchar(255),
  program_interested        varchar(255),
  high_school_score         varchar(255),
  senior_secondary_score    varchar(255),
  graduation_score          varchar(255),
  sat                       varchar(255),
  toefl                     varchar(255),
  ielts                     varchar(255),
  gre                       varchar(255),
  gmat                      varchar(255),
  remarks                   text,
  school_id                 bigint,
  constraint uq_users_email unique (email),
  constraint pk_users primary key (id))
;


create table colleges_majors (
  colleges_id                    bigint not null,
  majors_id                      bigint not null,
  constraint pk_colleges_majors primary key (colleges_id, majors_id))
;

create table degrees_streams (
  degrees_id                     bigint not null,
  streams_id                     bigint not null,
  constraint pk_degrees_streams primary key (degrees_id, streams_id))
;

create table majors_colleges (
  majors_id                      bigint not null,
  colleges_id                    bigint not null,
  constraint pk_majors_colleges primary key (majors_id, colleges_id))
;

create table majors_occupations (
  majors_id                      bigint not null,
  occupations_id                 bigint not null,
  constraint pk_majors_occupations primary key (majors_id, occupations_id))
;

create table occupations_majors (
  occupations_id                 bigint not null,
  majors_id                      bigint not null,
  constraint pk_occupations_majors primary key (occupations_id, majors_id))
;

create table streams_degrees (
  streams_id                     bigint not null,
  degrees_id                     bigint not null,
  constraint pk_streams_degrees primary key (streams_id, degrees_id))
;
create sequence colleges_seq;

create sequence comments_seq;

create sequence degrees_seq;

create sequence departments_seq;

create sequence majors_seq;

create sequence occupations_seq;

create sequence queries_seq;

create sequence schools_seq;

create sequence specializations_seq;

create sequence streams_seq;

create sequence universities_seq;

create sequence users_seq;

alter table colleges add constraint fk_colleges_university_1 foreign key (university_id) references universities (id);
create index ix_colleges_university_1 on colleges (university_id);
alter table comments add constraint fk_comments_query_2 foreign key (query_id) references queries (id);
create index ix_comments_query_2 on comments (query_id);
alter table departments add constraint fk_departments_college_3 foreign key (college_id) references colleges (id);
create index ix_departments_college_3 on departments (college_id);
alter table majors add constraint fk_majors_stream_4 foreign key (stream_id) references streams (id);
create index ix_majors_stream_4 on majors (stream_id);
alter table queries add constraint fk_queries_creator_5 foreign key (creator_id) references users (id);
create index ix_queries_creator_5 on queries (creator_id);
alter table specializations add constraint fk_specializations_major_6 foreign key (major_id) references majors (id);
create index ix_specializations_major_6 on specializations (major_id);
alter table users add constraint fk_users_school_7 foreign key (school_id) references schools (id);
create index ix_users_school_7 on users (school_id);



alter table colleges_majors add constraint fk_colleges_majors_colleges_01 foreign key (colleges_id) references colleges (id);

alter table colleges_majors add constraint fk_colleges_majors_majors_02 foreign key (majors_id) references majors (id);

alter table degrees_streams add constraint fk_degrees_streams_degrees_01 foreign key (degrees_id) references degrees (id);

alter table degrees_streams add constraint fk_degrees_streams_streams_02 foreign key (streams_id) references streams (id);

alter table majors_colleges add constraint fk_majors_colleges_majors_01 foreign key (majors_id) references majors (id);

alter table majors_colleges add constraint fk_majors_colleges_colleges_02 foreign key (colleges_id) references colleges (id);

alter table majors_occupations add constraint fk_majors_occupations_majors_01 foreign key (majors_id) references majors (id);

alter table majors_occupations add constraint fk_majors_occupations_occupat_02 foreign key (occupations_id) references occupations (id);

alter table occupations_majors add constraint fk_occupations_majors_occupat_01 foreign key (occupations_id) references occupations (id);

alter table occupations_majors add constraint fk_occupations_majors_majors_02 foreign key (majors_id) references majors (id);

alter table streams_degrees add constraint fk_streams_degrees_streams_01 foreign key (streams_id) references streams (id);

alter table streams_degrees add constraint fk_streams_degrees_degrees_02 foreign key (degrees_id) references degrees (id);

# --- !Downs

drop table if exists colleges cascade;

drop table if exists colleges_majors cascade;

drop table if exists comments cascade;

drop table if exists degrees cascade;

drop table if exists degrees_streams cascade;

drop table if exists departments cascade;

drop table if exists majors cascade;

drop table if exists majors_colleges cascade;

drop table if exists majors_occupations cascade;

drop table if exists occupations cascade;

drop table if exists occupations_majors cascade;

drop table if exists queries cascade;

drop table if exists schools cascade;

drop table if exists specializations cascade;

drop table if exists streams cascade;

drop table if exists streams_degrees cascade;

drop table if exists universities cascade;

drop table if exists users cascade;

drop sequence if exists colleges_seq;

drop sequence if exists comments_seq;

drop sequence if exists degrees_seq;

drop sequence if exists departments_seq;

drop sequence if exists majors_seq;

drop sequence if exists occupations_seq;

drop sequence if exists queries_seq;

drop sequence if exists schools_seq;

drop sequence if exists specializations_seq;

drop sequence if exists streams_seq;

drop sequence if exists universities_seq;

drop sequence if exists users_seq;

