# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## users table

| Column | Type | Options |
|:-------|:-----|:-------:|
| name | string ||
| email | string ||
| password | string ||

## groups table

| Column | Type | Options |
|:-------|:----:|:-------:|
| group_name | string ||

## messages table

| Column | Type | Options |
|:-------|:----:|:-------:|
| body | text ||
| image | string ||
| group_id | integer ||
| user_id | integer ||

## users_groups table

| Column | Type | Options |
|:-------|:-----|:--------|
| user_id | integer ||
| group_id | integer ||