-- auto-generated definition
create table user
(
    user_id           bigint                                           not null
        primary key,
    username     varchar(50)                                      not null,
    password     char(128)                                        not null,
    created_time datetime               default CURRENT_TIMESTAMP not null,
    role         enum ('user', 'admin') default 'user'            not null,
    constraint username
        unique (username)
);
create table dictionary(
    dictionary_id           bigint    not null,
    dictionary_name varchar(50) not null,
    create_user_id bigint not null,
    created_time datetime               default CURRENT_TIMESTAMP not null,


    constraint user_id
        foreign key (create_user_id) references user (user_id)
)
-- End of file.


