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
| name | string | null: false, unique: true |
| email | string |null: false, unique: true |
| password | string |null: false|

## groups table

| Column | Type | Options |
|:-------|:----:|:-------:|
| group_name | string |null: false|

## messages table

| Column | Type | Options |
|:-------|:----:|:-------:|
| body | text |null: false|
| image | string |null: false|
| group_id | integer |null: false, foreign_key: true|
| user_id | integer |null: false, foreign_key: true|

## users_groups table

| Column | Type | Options |
|:-------|:-----|:--------|
| user_id | integer |null: false, foreign_key: true|
| group_id | integer |null: false, foreign_key: true|