#include "stdio.h"
#include "string.h"
#include "stdlib.h"

char fetch(void);
void unfetch(char);

// get line from command line
#define MAXLEN 100
int mgetline(char s[], int maxlen)
{
    int len=0;
    while( (*s++ = getchar()) != '\n' && len++ <maxlen )
        ;
    *(s-1) = '\0';
    return len;
}

int readlines(char *s[], int maxsize)
{
    int len,size;
    char *p, buf[MAXLEN];
    size=0;

    while( len = mgetline(buf, MAXLEN) && size < maxsize )
        if ( (p = (char *)malloc(sizeof(char) * MAXLEN )) == NULL )
            return -1;
        else
        {
            strcpy(p, buf);
            //printf("%s\n",p);
            s[size++] = p;
        }
    return size;
}

void writelines(char *s[], int size)
{
    int i;

    for(i=0; i<size; i++)
        printf("%3.3d, %s\n", i, s[i] );
}

/*
 * NAME getword
 * PRAMS
 *	char *s
 *		the string where the word will fill in
 *  int maxsize
 *		the word's maxsize
 * RETURN
 *	the actual word length
 */
int getword(char *s, int maxsize)
{
	int len;
	char t;
	len=0;
	while(t = fetch())
	{
		if (t != ' ' && t != '\n')
			break;
	}
	unfetch(t);
	while(( t = fetch()) && len < maxsize)
	{
		if (t == ' ' || t == '\n' )
			break;
		*s++ = t;
		len++;
	}
	*s = '\0';
	return len;
}

#define BUFSIZE 100

char buf[BUFSIZE];
int bufp = 0;

char fetch(void)
{
	return bufp ? buf[--bufp] : getchar();
}

void unfetch(char c)
{
	if (bufp >= BUFSIZE)
		printf("ERROR: ungetch: too many characters!\n");
	else
		buf[bufp++] = c;
}
