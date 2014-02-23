CREATE TABLE acl (
    username VARCHAR(10),
    host VARCHAR(128),
    channel VARCHAR(128),
    access VARCHAR(128)
);

CREATE TABLE config (
    channel VARCHAR(128),
    key VARCHAR(128),
    value VARCHAR(1024)
);
