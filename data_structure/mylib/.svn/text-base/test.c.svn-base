#include "stdio.h"
#include "string.h"
#include "stdlib.h"

// test string functions
/*
void main(int argc, char **argv)
{
    char a[8] = "aaa";
    char b[4] = "bbb";
    char c[4] = "ccc";

    mystrcpy(a,b);

    // test string copy function
    printf("strcpy: %s\n", a);

    // test string compare function
    printf("strcmp: %d\n", mystrcmp(a,c));

    // test string cat function
    mystrcat(a, c);
    printf("strcat: %s\n", a);

    // test string end function
    printf("strend: %d", mystrend(a, c));

    return 0;
}
*/

// test sort function
/*
#define MAXSIZE 100
char *buffer[MAXSIZE];

int main(int argc,char **argv)
{
    // input lines, and get size
    int size = readlines(buffer, MAXSIZE);

    // sort the lines
    mqsort(buffer,size, -1);

    // output [size]
    printf("SIZE: %d\n", size);

    // output all the lines
    writelines(buffer, size);

    return 0;
}
*/

// test datetime function
/*
int main(int argc, char **argv)
{
    int m, d;
    day2date(2012,2,&m,&d);
    printf("%d %d",m,d);

    return 0;
}
*/

// pointer to function
/*
int *fuck(int, int);
int *shit(int, int);
int *print(int count, int *(*)(int, int));

int main(int argc, char **argv)
{
    int *c;
    c = print(10,(int *(*)(int,int))shit);
    printf("%d", *c);
    return 0;
}

int *print(int count, int *(*f)(int, int))
{
    int a;
    a=*(*f)(count, 1);
    return &a;
}

int *fuck(int n, int c)
{
    int i;
    int count;
    count=0;
    for(i=0; i<n; i++)
        printf("%3.3d fuck\n",++count);
    return &count;
}

int *shit(int n, int c)
{
    int i;
    int count;
    count=0;
    for(i=0; i<n; i++)
        printf("%3.3d shit\n",++count);
    return &count;
}
*/

// struct test
/*
struct {
    int x;
    int y
    }
* a;

int main(void)
{
    a=(struct{int x;int y} *)malloc(sizeof(struct{int x;int y}));
    printf("x: %d, y: %d", a->x, a->y);
}
*/

// test Tree node
/*
#define MAXWORD 100
int main(int argc,char **argv)
{
    struct Tnode *root;
	char word[MAXWORD];
	root = NULL;

	while(getword(word,MAXWORD) != EOF)
	{
	    if (!strcmp(word, "EOF"))
            break;
        root = addtree(root, word);
	}
    treeprint(root);
	return 0;
}
*/

// multi-arguments
/*
#include "stdarg.h"
void print(char *s, ...);
int main(int argc, char **argv)
{
    char input[3];
    print(input,1);
    return 0;
}

void print(char *s, ...)
{
    va_list args;
    va_start(args, s);

    int i;
    while((i = va_arg(args, int)) != NULL)
        printf("%d\n",i);
    va_end(args);
}
*/


