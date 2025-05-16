SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES

	('00000000-0000-0000-0000-000000000000', 'e22340c1-c0b1-4eae-aa10-6632e4a1896d', '{"action":"token_refreshed","actor_id":"0f7904ca-4df1-4e3b-9d4c-03068202b83a","actor_username":"wladi96@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-15 17:44:12.494055+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('ac92d844-49a3-435f-94de-9f9d5dfb735d', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', '653f054e-248f-40cb-920c-b8b64446076e', 's256', 'T1PnxR2EvhOjDbeO85yqH-3uZHVZeDzIXV-TwIUSP5Y', 'email', '', '', '2025-05-04 12:10:59.393485+00', '2025-05-04 12:13:22.451495+00', 'email/signup', '2025-05-04 12:13:22.45145+00'),
	('1f2de14a-6c11-4ba2-a121-4868720cbe0b', '0f09092f-c424-4ed6-be87-bb780f2f4750', 'bbef1e43-c3ee-46d4-a300-1bb7e26d6bf7', 's256', 'hdOZgDFxU-Yhmb5gsDS6Nhv7O2xTwkzk2_kn6Wfj_KM', 'email', '', '', '2025-05-11 19:13:19.328842+00', '2025-05-11 19:13:19.328842+00', 'email/signup', NULL),
	('984a0828-d021-4c13-9799-deffb930bf36', '582e3d41-4559-4d89-a9a8-fa564c0d9d68', '88db9c60-28a0-422b-a054-b262b05fbafc', 's256', '4qUefJKRSV8N09atADSHdJMJG7KEYQ9yxWC5Z1EGMdA', 'email', '', '', '2025-05-11 19:19:41.265163+00', '2025-05-11 19:19:41.265163+00', 'email/signup', NULL),
	('faf59b82-84cf-4519-8ea3-12ef70f926b8', '797b0b5f-8889-449c-a455-c574f190a7eb', 'c602ae1f-8d41-4053-b40b-988a813bfbf5', 's256', 'DB2JLSYxbd_CRMtBQNW4SOVF3E9TRlwcJLGVOGBFC0c', 'email', '', '', '2025-05-11 19:23:18.093842+00', '2025-05-11 19:23:18.093842+00', 'email/signup', NULL),
	('5487eb20-aa2c-4359-ada0-137cc06b76cf', '797b0b5f-8889-449c-a455-c574f190a7eb', 'a58f4d17-e60a-4744-a8fc-005c8d628335', 's256', '_jwEd6igpuzWkocAZX0ugziTqpZ30vl27FMCX8hFqd0', 'email', '', '', '2025-05-11 19:26:47.418882+00', '2025-05-11 19:26:47.418882+00', 'email/signup', NULL),
	('b2ee30b0-2858-4285-b60d-4e0cff34308c', '797b0b5f-8889-449c-a455-c574f190a7eb', '3507f4c8-ffc0-42fd-b709-3e01d91e7491', 's256', 'nCHmEKsShwqI_rLYe2bTzQex9yvmnOZ_zJEb6AqSC2A', 'email', '', '', '2025-05-13 13:30:29.882096+00', '2025-05-13 13:30:29.882096+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '797b0b5f-8889-449c-a455-c574f190a7eb', 'authenticated', 'authenticated', 'wcyclops96@gmail.com', '$2a$10$4UUdKAY2djuscocRkuyq3OaQjB6cNdhKDlA7z92c4Xz37xZ4OKUaW', NULL, NULL, 'pkce_a689b126b246199694c073ea65e79518147be75da0db3d7478c43263', '2025-05-13 13:30:29.889952+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "797b0b5f-8889-449c-a455-c574f190a7eb", "email": "wcyclops96@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2025-05-11 19:23:18.083725+00', '2025-05-13 13:30:31.294232+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e', 'authenticated', 'authenticated', 'rebeldes96@gmail.com', '$2a$10$N26g2epGGn0MYwiR3r0Ame6tebdUDrkvlvyTwsYreSguekGPTOB8.', '2025-05-05 07:54:47.610919+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-05-13 16:34:03.769777+00', '{"provider": "email", "userrole": "manager", "providers": ["email"]}', '{"sub": "9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e", "email": "rebeldes96@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-05 07:54:26.570171+00', '2025-05-15 10:43:40.227167+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', 'authenticated', 'authenticated', 'wladi96@gmail.com', '$2a$10$/fuMc.MJT0RNOBtfFR1ByOcyUu0688sPrV7Li9zvG/vtGAshmVvce', '2025-05-04 12:13:22.441826+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-05-15 11:06:08.061504+00', '{"provider": "email", "providers": ["email"], "claims_admin": true}', '{"sub": "0f7904ca-4df1-4e3b-9d4c-03068202b83a", "email": "wladi96@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-04 12:10:59.338188+00', '2025-05-15 17:44:10.357188+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('0f7904ca-4df1-4e3b-9d4c-03068202b83a', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', '{"sub": "0f7904ca-4df1-4e3b-9d4c-03068202b83a", "email": "wladi96@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-04 12:10:59.373384+00', '2025-05-04 12:10:59.373437+00', '2025-05-04 12:10:59.373437+00', 'c0402ea9-3ecd-4acf-8eac-e3a254e1615e'),
	('9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e', '9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e', '{"sub": "9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e", "email": "rebeldes96@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-05-05 07:54:26.58704+00', '2025-05-05 07:54:26.587102+00', '2025-05-05 07:54:26.587102+00', '3a0df20a-d5ae-494b-8342-b024565afaa1'),
	('797b0b5f-8889-449c-a455-c574f190a7eb', '797b0b5f-8889-449c-a455-c574f190a7eb', '{"sub": "797b0b5f-8889-449c-a455-c574f190a7eb", "email": "wcyclops96@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-11 19:23:18.088789+00', '2025-05-11 19:23:18.088847+00', '2025-05-11 19:23:18.088847+00', 'dd05e038-1121-4b31-8160-26b28c0e2f81');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('e1c113ef-01aa-4775-a910-fd26107bcdd8', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', '2025-05-15 11:06:08.06291+00', '2025-05-15 17:44:12.496014+00', NULL, 'aal1', NULL, '2025-05-15 17:44:12.495928', 'Next.js Middleware', '27.98.29.188', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('e1c113ef-01aa-4775-a910-fd26107bcdd8', '2025-05-15 11:06:08.076105+00', '2025-05-15 11:06:08.076105+00', 'password', 'ed58918a-cc29-43c6-8cfb-3637482444b4');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('ef01623d-31a7-4683-b004-3dae39209a17', '797b0b5f-8889-449c-a455-c574f190a7eb', 'confirmation_token', 'pkce_a689b126b246199694c073ea65e79518147be75da0db3d7478c43263', 'wcyclops96@gmail.com', '2025-05-13 13:30:31.333984', '2025-05-13 13:30:31.333984');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 42, 'ddbx4cfj3puh', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', true, '2025-05-15 11:06:08.071714+00', '2025-05-15 17:44:10.34839+00', NULL, 'e1c113ef-01aa-4775-a910-fd26107bcdd8'),
	('00000000-0000-0000-0000-000000000000', 43, 'aih7623vndwe', '0f7904ca-4df1-4e3b-9d4c-03068202b83a', false, '2025-05-15 17:44:10.354126+00', '2025-05-15 17:44:10.354126+00', 'ddbx4cfj3puh', 'e1c113ef-01aa-4775-a910-fd26107bcdd8');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: game_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."game_slots" ("id", "slot_date", "start_time", "end_time", "game_id", "created_at") VALUES
	('497674bb-a0cd-4689-86c0-47fbd69da2a9', '2025-04-16', '21:05:00', '21:25:00', '1', '2025-05-05 12:07:58.296688+00'),
	('a204c04d-b2e7-420d-8320-4321d5e692f0', '2025-04-16', NULL, NULL, '2', '2025-05-05 12:53:11.505405+00'),
	('a768dc26-b549-433f-b72b-8aca8c3b4c0a', '2025-04-16', NULL, NULL, '3', '2025-05-05 12:53:19.805126+00'),
	('a1408fbc-2687-4657-97c7-49b70d4d776e', '2025-05-28', NULL, NULL, '1', '2025-05-05 13:06:11.09636+00'),
	('92af3ba1-1cf4-40e6-8e55-9032772bf695', '2025-05-28', NULL, NULL, '2', '2025-05-05 13:06:18.884183+00'),
	('b582fcaf-ea98-4be1-85e5-f7460401c1f8', '2025-05-28', NULL, NULL, '3', '2025-05-05 13:06:25.841884+00'),
	('770bd8ba-43e6-46f2-bcfd-47926cbc77d5', '2025-06-25', NULL, NULL, '1', '2025-05-05 13:08:28.203278+00'),
	('e497c7da-1645-4396-99db-127a7c857f12', '2025-06-25', NULL, NULL, '2', '2025-05-05 13:08:36.048748+00'),
	('5dc43764-d81a-4a70-b2eb-3d78cb6ee485', '2025-06-25', NULL, NULL, '3', '2025-05-05 13:08:45.732011+00'),
	('61c0f8e1-1e06-4951-a472-a9c4d1a9772a', '2025-07-16', NULL, NULL, '1', '2025-05-05 13:24:54.085099+00'),
	('1853d11c-bc79-4237-ae3b-d2b9097694d1', '2025-07-16', NULL, NULL, '2', '2025-05-05 13:25:06.183094+00'),
	('96d87070-2740-4cd3-8c40-baf4b83f078b', '2025-07-16', NULL, NULL, '3', '2025-05-05 13:25:31.684583+00'),
	('404984b5-2783-4323-8591-ab69884403d9', '2025-08-27', NULL, NULL, '1', '2025-05-05 13:27:00.759585+00'),
	('1c76be3a-1728-41a2-b60f-b2591321c247', '2025-08-27', NULL, NULL, '2', '2025-05-05 13:27:28.547248+00'),
	('cf42bca3-4f0f-4ecc-a90d-2c852b0c8725', '2025-08-27', NULL, NULL, '3', '2025-05-05 13:27:39.302719+00');


--
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."seasons" ("id", "name", "start_date", "end_date", "is_active", "created_at") VALUES
	('952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '2025年ナイターリーグ', '2025-04-16', '2026-01-14', true, '2025-05-05 11:54:58.156119+00');


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teams" ("id", "name", "logo_url", "abbreviation", "created_at") VALUES
	('9fc0c50e-4c99-45a1-83bf-a2906d881f82', 'ヘベウデス', NULL, 'REB', '2025-05-05 10:10:46.212853+00'),
	('84be96d6-f7da-490d-a819-1a1c1921f304', '05ユニティーズ', NULL, '05', '2025-05-05 10:12:26.86282+00'),
	('1435e7db-09a3-4365-9609-fac26d981ebb', 'TUC', NULL, 'TUC', '2025-05-05 10:12:38.439989+00'),
	('c4a07936-004e-4478-8869-fa715b782992', 'いやさか2000', NULL, 'IYA', '2025-05-05 10:13:09.99977+00'),
	('4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'Undefeated', NULL, 'UND', '2025-05-05 10:13:25.97576+00'),
	('89737bdf-3263-47e1-994f-23b2662d7b84', 'コンパネロス', NULL, 'COM', '2025-05-05 10:13:39.427109+00');


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."schedule" ("id", "season_id", "slot_id", "home_team_id", "away_team_id", "referee_team_id", "record_team_id", "status", "created_at") VALUES
	('5fa534b3-1dbe-46a9-a4a9-b032ed7c2fd1', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'a1408fbc-2687-4657-97c7-49b70d4d776e', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '84be96d6-f7da-490d-a819-1a1c1921f304', '89737bdf-3263-47e1-994f-23b2662d7b84', 'scheduled', '2025-05-05 13:06:55.607477+00'),
	('2526aecf-9648-492d-b4c9-1df799775246', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '92af3ba1-1cf4-40e6-8e55-9032772bf695', '1435e7db-09a3-4365-9609-fac26d981ebb', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 'scheduled', '2025-05-05 13:07:36.494185+00'),
	('71c239a5-1517-4af3-b00b-15ddedf859e2', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'b582fcaf-ea98-4be1-85e5-f7460401c1f8', '84be96d6-f7da-490d-a819-1a1c1921f304', '89737bdf-3263-47e1-994f-23b2662d7b84', '1435e7db-09a3-4365-9609-fac26d981ebb', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'scheduled', '2025-05-05 13:08:09.582629+00'),
	('14f5d04d-bab5-4044-8ca2-08e3de2564d6', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '770bd8ba-43e6-46f2-bcfd-47926cbc77d5', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '1435e7db-09a3-4365-9609-fac26d981ebb', '84be96d6-f7da-490d-a819-1a1c1921f304', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'scheduled', '2025-05-05 13:23:27.588022+00'),
	('e0a52bf5-9181-4c42-8d24-975ac4b56f2d', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '5dc43764-d81a-4a70-b2eb-3d78cb6ee485', '84be96d6-f7da-490d-a819-1a1c1921f304', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', '89737bdf-3263-47e1-994f-23b2662d7b84', 'c4a07936-004e-4478-8869-fa715b782992', 'scheduled', '2025-05-05 13:24:39.976915+00'),
	('b029fcb0-4e05-41ce-951c-cbc7fd7341fc', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '61c0f8e1-1e06-4951-a472-a9c4d1a9772a', '1435e7db-09a3-4365-9609-fac26d981ebb', 'c4a07936-004e-4478-8869-fa715b782992', '84be96d6-f7da-490d-a819-1a1c1921f304', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 'scheduled', '2025-05-05 13:25:51.798659+00'),
	('ed2bc060-1bc3-4ca3-bb56-989a6604ecf0', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '1853d11c-bc79-4237-ae3b-d2b9097694d1', '89737bdf-3263-47e1-994f-23b2662d7b84', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', '1435e7db-09a3-4365-9609-fac26d981ebb', 'c4a07936-004e-4478-8869-fa715b782992', 'scheduled', '2025-05-05 13:26:12.638937+00'),
	('b4092edd-db18-451d-b925-e7b79c6e6d8a', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '96d87070-2740-4cd3-8c40-baf4b83f078b', '84be96d6-f7da-490d-a819-1a1c1921f304', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '89737bdf-3263-47e1-994f-23b2662d7b84', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'scheduled', '2025-05-05 13:26:33.749067+00'),
	('a6769157-6887-4411-a16c-50a7cfe1b1c2', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '404984b5-2783-4323-8591-ab69884403d9', '89737bdf-3263-47e1-994f-23b2662d7b84', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '84be96d6-f7da-490d-a819-1a1c1921f304', '1435e7db-09a3-4365-9609-fac26d981ebb', 'scheduled', '2025-05-05 13:28:04.02111+00'),
	('777a24f7-d785-4906-99c3-27b606f067d5', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '1c76be3a-1728-41a2-b60f-b2591321c247', 'c4a07936-004e-4478-8869-fa715b782992', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', '89737bdf-3263-47e1-994f-23b2662d7b84', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 'scheduled', '2025-05-05 13:28:34.06232+00'),
	('7a7d75fa-98ba-49c6-9c0f-57404894d36b', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'cf42bca3-4f0f-4ecc-a90d-2c852b0c8725', '84be96d6-f7da-490d-a819-1a1c1921f304', '1435e7db-09a3-4365-9609-fac26d981ebb', 'c4a07936-004e-4478-8869-fa715b782992', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'scheduled', '2025-05-05 13:29:01.492284+00'),
	('040db2a4-e9db-4185-8b01-39d94a159044', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'a768dc26-b549-433f-b72b-8aca8c3b4c0a', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', '1435e7db-09a3-4365-9609-fac26d981ebb', '89737bdf-3263-47e1-994f-23b2662d7b84', 'completed', '2025-05-05 13:05:54.265088+00'),
	('10a687da-6843-42d8-9f54-21a4e58dde62', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'e497c7da-1645-4396-99db-127a7c857f12', '89737bdf-3263-47e1-994f-23b2662d7b84', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '1435e7db-09a3-4365-9609-fac26d981ebb', 'scheduled', '2025-05-05 13:23:58.438803+00'),
	('6ffe2c1c-5be5-4702-9863-fa82e31cd754', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'a204c04d-b2e7-420d-8320-4321d5e692f0', '1435e7db-09a3-4365-9609-fac26d981ebb', '89737bdf-3263-47e1-994f-23b2662d7b84', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', 'completed', '2025-05-05 13:05:21.699531+00'),
	('f6561642-45b1-480e-a000-3315617195e6', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '497674bb-a0cd-4689-86c0-47fbd69da2a9', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', '1435e7db-09a3-4365-9609-fac26d981ebb', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'scheduled', '2025-05-10 08:44:01.372165+00'),
	('0e909fea-1835-4d4f-bded-b708488aebc9', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '497674bb-a0cd-4689-86c0-47fbd69da2a9', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '1435e7db-09a3-4365-9609-fac26d981ebb', 'scheduled', '2025-05-10 08:44:50.399065+00'),
	('70721b02-cecf-48e6-8bda-65085aadb126', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '497674bb-a0cd-4689-86c0-47fbd69da2a9', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '1435e7db-09a3-4365-9609-fac26d981ebb', 'scheduled', '2025-05-10 08:48:17.612074+00'),
	('912ebe15-3ede-401e-bc2a-aefa892bb475', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '497674bb-a0cd-4689-86c0-47fbd69da2a9', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '1435e7db-09a3-4365-9609-fac26d981ebb', 'scheduled', '2025-05-10 08:49:02.180909+00'),
	('000dbdcb-3a46-4a87-acc5-be7f583ed9ec', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '497674bb-a0cd-4689-86c0-47fbd69da2a9', '84be96d6-f7da-490d-a819-1a1c1921f304', 'c4a07936-004e-4478-8869-fa715b782992', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 'completed', '2025-05-05 12:08:38.193888+00');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."players" ("id", "team_id", "user_id", "number", "name", "position", "photo_url", "is_active", "is_helper", "created_at") VALUES
	('38c4058c-e987-41c9-ba8c-643d793b6fdc', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '96', 'セグラW', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('181b82dc-457a-42c6-ac83-e264a202beab', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '0', '住垣 智之', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('ae590770-94fd-434b-833e-af082292b9bc', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '0', '甲斐田', 'DF', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('045bf61f-f988-4fc2-a55c-b04fbc580860', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '3', '佐藤まゆみ', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('e67a43d0-5878-4e25-8ae5-976a3a636385', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '45', '相良真吾', 'HP', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('f16d1e55-1625-4c20-bc2c-439930e63403', '84be96d6-f7da-490d-a819-1a1c1921f304', NULL, '10', '佐々木 瞬', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('c4cd479a-be23-4d6e-bc04-76ffd3d4ce22', '84be96d6-f7da-490d-a819-1a1c1921f304', NULL, '56', '杉村 匠', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('640de3a0-5392-40ae-aa8c-21d0c25698ce', '84be96d6-f7da-490d-a819-1a1c1921f304', NULL, '11', '住垣 香奈子', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('dcf5f346-3436-44f1-b3d6-ddf7718e8b19', '84be96d6-f7da-490d-a819-1a1c1921f304', NULL, '0', '安田 里奈', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('c303582f-96a1-4b46-8510-0dc43b2a97b3', '84be96d6-f7da-490d-a819-1a1c1921f304', NULL, '0', '三田 直樹', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('19370a21-5151-407a-b82c-2806f2cccc05', '1435e7db-09a3-4365-9609-fac26d981ebb', NULL, '0', '坂上 敬冶', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('1cc2238c-41a9-4502-8a21-d843d4a6a6b6', '1435e7db-09a3-4365-9609-fac26d981ebb', NULL, '0', '篠崎 美晃', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('42616449-92c2-43a3-822b-3c48bfb4c887', '1435e7db-09a3-4365-9609-fac26d981ebb', NULL, '0', '川口 星哉', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('a31ccafb-4e38-45df-be81-a9b901426dbc', '1435e7db-09a3-4365-9609-fac26d981ebb', NULL, '0', '篠崎弘子', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('1ad24bbd-212a-4499-aff6-0dd9dd51cbcd', 'c4a07936-004e-4478-8869-fa715b782992', NULL, '0', '高橋 義弘', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('763e50a2-4ba2-4669-8920-c2335ae8e103', 'c4a07936-004e-4478-8869-fa715b782992', NULL, '0', '中野 隆治', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('7decf913-6e28-431a-96a9-e0eec56c9131', 'c4a07936-004e-4478-8869-fa715b782992', NULL, '0', '佐藤 祐子', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('7aa2a713-1a25-4bf3-8273-c085a2d44eb2', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '佐藤 豪太', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('f12503bf-53a1-486e-97d9-5bdb24b1bf2a', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '中野', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('2f286bae-2770-4386-bf45-039bd5411ef1', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '南', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('80be4ee1-8ab4-4533-a0ef-cdbce65ac9c8', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '木村 雅直', 'DF', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('67168485-41e1-40e7-ad45-900948016a8d', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '服部 光秀', 'DF', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('a690d029-f724-4ba0-9512-38cec6ddc93e', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', NULL, '0', '土谷 力', 'FW', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('ab3849b3-f404-4276-af65-59c28c14cf94', '89737bdf-3263-47e1-994f-23b2662d7b84', NULL, '0', 'せいじ', 'C', NULL, true, false, '2025-05-05 10:44:50.10718+00'),
	('a70b0ade-76b0-4730-b950-5972d8ff0991', '89737bdf-3263-47e1-994f-23b2662d7b84', NULL, '2', '安田', 'C', NULL, true, false, '2025-05-06 15:46:01.76876+00'),
	('01466414-8c90-4a42-b4fa-60299759eb12', '89737bdf-3263-47e1-994f-23b2662d7b84', NULL, '1', '池田', 'FW', NULL, true, false, '2025-05-06 15:46:28.765655+00'),
	('3b07a6a9-72f2-4a91-ae5c-8a9be5387e96', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', NULL, '35', 'みこ', 'FW', NULL, true, false, '2025-05-06 15:54:59.813657+00');


--
-- Data for Name: goals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--




--
-- Data for Name: player_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."player_stats" ("id", "season_id", "player_id", "team_id", "games_played", "goals", "assists", "points", "created_at") VALUES
	('b89455a2-132d-4ab3-babd-18c4e2b9e2d8', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'f16d1e55-1625-4c20-bc2c-439930e63403', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 3, 1, 4, '2025-05-06 14:51:03.250921+00'),
	('2d1c9768-d84e-4580-8ab4-ca4ba1743f74', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'c4cd479a-be23-4d6e-bc04-76ffd3d4ce22', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 1, 2, 3, '2025-05-06 15:15:50.444751+00'),
	('f3ffd731-2b82-4c68-94d5-53831f846398', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '640de3a0-5392-40ae-aa8c-21d0c25698ce', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 0, 0, 0, '2025-05-06 15:34:46.658079+00'),
	('c531b1ba-713b-4287-adcd-89f053d7c7c5', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'dcf5f346-3436-44f1-b3d6-ddf7718e8b19', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 0, 1, 1, '2025-05-06 15:19:47.806652+00'),
	('b61a72ec-5ef5-4c8f-bc19-bdb7f59215b2', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'c303582f-96a1-4b46-8510-0dc43b2a97b3', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 1, 0, 1, '2025-05-06 15:34:32.596883+00'),
	('1e053f8b-748e-40a7-ba88-a73847f17ca4', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '763e50a2-4ba2-4669-8920-c2335ae8e103', 'c4a07936-004e-4478-8869-fa715b782992', 1, 0, 1, 1, '2025-05-06 15:41:18.712918+00'),
	('3fb9462f-b4e3-4c08-91c4-bcf15634e8e7', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '7decf913-6e28-431a-96a9-e0eec56c9131', 'c4a07936-004e-4478-8869-fa715b782992', 1, 0, 1, 1, '2025-05-06 15:41:27.984318+00'),
	('0ef68827-0a80-4d8c-b59a-9f1807f06169', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '181b82dc-457a-42c6-ac83-e264a202beab', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 1, 0, 1, '2025-05-06 15:54:24.235032+00'),
	('4d6d265c-74c6-4b24-9eaf-9e4abb2c1ff2', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '3b07a6a9-72f2-4a91-ae5c-8a9be5387e96', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 1, 0, 1, '2025-05-06 15:55:21.390501+00'),
	('4d737ad4-4b27-4458-adae-7e19e0267f9c', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'ae590770-94fd-434b-833e-af082292b9bc', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 0, 1, 1, '2025-05-06 15:55:37.765034+00'),
	('69608c3c-d969-4c9c-93fb-71ee94939803', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '38c4058c-e987-41c9-ba8c-643d793b6fdc', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 1, 0, 1, '2025-05-06 15:56:07.832441+00'),
	('d7b3f6f0-ce47-4428-8e6d-772db5c43f52', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '045bf61f-f988-4fc2-a55c-b04fbc580860', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 0, 0, 0, '2025-05-06 15:56:13.552264+00'),
	('4530e942-581d-488b-a38b-9dc15da4d47b', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'a70b0ade-76b0-4730-b950-5972d8ff0991', '89737bdf-3263-47e1-994f-23b2662d7b84', 1, 2, 0, 2, '2025-05-06 15:47:01.758294+00'),
	('965c53ca-f242-4dbd-aa1f-a254c9d8db34', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '01466414-8c90-4a42-b4fa-60299759eb12', '89737bdf-3263-47e1-994f-23b2662d7b84', 1, 0, 0, 0, '2025-05-06 15:56:28.185421+00'),
	('8857545e-6cb5-4c92-bcbd-36de4d87c26d', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '1ad24bbd-212a-4499-aff6-0dd9dd51cbcd', 'c4a07936-004e-4478-8869-fa715b782992', 1, 0, 0, 0, '2025-05-06 15:56:34.409228+00'),
	('827f3ddc-fdad-4c14-8310-aedca8eca0aa', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '7aa2a713-1a25-4bf3-8273-c085a2d44eb2', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 1, 0, 1, 1, '2025-05-06 15:57:43.368386+00'),
	('6747ae7d-e411-4017-a058-697c969c535d', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'a690d029-f724-4ba0-9512-38cec6ddc93e', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 1, 1, 0, 1, '2025-05-06 15:58:05.016685+00'),
	('bb5fe9d2-1491-4bca-a11c-cc904411ff4a', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '80be4ee1-8ab4-4533-a0ef-cdbce65ac9c8', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 1, 2, 0, 2, '2025-05-06 15:58:20.309135+00'),
	('aa117c03-9e90-4269-86ee-be097786aad6', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '42616449-92c2-43a3-822b-3c48bfb4c887', '1435e7db-09a3-4365-9609-fac26d981ebb', 1, 1, 0, 1, '2025-05-08 17:15:50.597065+00');


--
-- Data for Name: team_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."team_requests" ("id", "user_id", "team_id", "jersey_number", "status", "created_at", "updated_at") VALUES
	('736913a2-b26e-4a05-821e-ed6cf72a65b6', '9ad7a71a-86b7-4c8d-8974-cf14e0a9ef7e', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', '96', 'pending', '2025-05-13 14:12:41.622554+00', '2025-05-13 14:12:41.622554+00');


--
-- Data for Name: team_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."team_stats" ("id", "season_id", "team_id", "games_played", "wins", "losses", "ties", "points", "goals_for", "goals_against", "created_at") VALUES
	('c198e3fd-5170-41e9-ab92-bc176da8da8c', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '84be96d6-f7da-490d-a819-1a1c1921f304', 1, 1, 0, 0, 3, 7, 4, '2025-05-06 16:39:54.131695+00'),
	('6b51fd86-2c9b-4c5e-a208-0d083e64262d', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', 'c4a07936-004e-4478-8869-fa715b782992', 1, 0, 1, 0, 0, 4, 7, '2025-05-06 16:42:18.79522+00'),
	('1f0a8aa9-d4c6-4e7e-8bb1-f8fda2f9e5f7', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '1435e7db-09a3-4365-9609-fac26d981ebb', 1, 1, 0, 0, 3, 9, 3, '2025-05-06 16:44:12.260318+00'),
	('cfdaca13-3eb3-4c02-ae81-f6dc0fa64f88', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '89737bdf-3263-47e1-994f-23b2662d7b84', 1, 0, 1, 0, 0, 3, 7, '2025-05-06 16:44:37.936446+00'),
	('6d4554a4-8b3b-44d9-baae-4b0da7e3625d', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '9fc0c50e-4c99-45a1-83bf-a2906d881f82', 1, 1, 0, 0, 3, 4, 3, '2025-05-06 16:45:52.100689+00'),
	('2046fc5c-4fa2-436b-a07e-c7e37ce88ccf', '952a92d3-8ec1-4b40-b26e-a9ab6c7d3f9d', '4491ab61-7fe5-4ce7-a5a3-6e105a043a76', 1, 0, 1, 0, 0, 3, 4, '2025-05-06 16:46:05.283965+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('k-nhl.net', 'k-nhl.net', NULL, '2025-05-10 13:24:11.219723+00', '2025-05-10 13:24:11.219723+00', false, false, 5242880, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('1b24dc49-7ebe-4b8a-ae87-c92fd24eba82', 'k-nhl.net', 'HeroBackground.jpg', NULL, '2025-05-10 13:24:49.573953+00', '2025-05-10 13:24:49.573953+00', '2025-05-10 13:24:49.573953+00', '{"eTag": "\"71b506e98e0fee920da70090aae0ce19-1\"", "size": 460773, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-05-10T13:24:50.000Z", "contentLength": 460773, "httpStatusCode": 200}', 'b94162a0-4541-4007-be18-44f273ca5574', NULL, NULL),
	('584491a6-b6c2-4b6a-bf1c-0e55bef84240', 'k-nhl.net', 'K-NHL.net.png', NULL, '2025-05-10 13:24:49.60692+00', '2025-05-10 13:24:49.60692+00', '2025-05-10 13:24:49.60692+00', '{"eTag": "\"fa77689da2750d096496a8992505682c-1\"", "size": 430364, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-05-10T13:24:50.000Z", "contentLength": 430364, "httpStatusCode": 200}', 'a4580f53-28e5-4875-bd0b-8e46c05daa67', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 43, true);



--
-- PostgreSQL database dump complete
--

RESET ALL;
