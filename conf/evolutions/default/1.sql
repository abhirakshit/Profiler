# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

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
  constraint uq_users_email unique (email),
  constraint pk_users primary key (id))
;

create sequence users_seq;




# --- !Downs

drop table if exists users cascade;

drop sequence if exists users_seq;

