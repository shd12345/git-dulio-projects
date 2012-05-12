
void mystrcpy(char *s, char *t)
{
    while(*t++ = *s++)
        ;
}

int mystrcmp(char *s, char *t)
{
    for( ; *s == *t; *s++, *t++ )
        if (*s == '\0')
            return 0;
    return *s - *t;
}

void mystrcat(char *s, char *t)
{
    for( ; *s!='\0'; *s++)
        ;
    while(*s++ = *t++)
        ;
}

int mystrend(char *s, char *t)
{
    while(*++s);
    while(*++t);
    while(*s-- == *t--)
        if (*t=='\0')
            return 1;
    return 0;
}
