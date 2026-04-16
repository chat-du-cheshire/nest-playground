CREATE USER mediumclone WITH PASSWORD 'mediumclonepass';
GRANT ALL PRIVILEGES ON DATABASE mediumclone TO mediumclone;
GRANT ALL ON SCHEMA public TO mediumclone;