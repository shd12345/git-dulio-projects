#include "stdio.h"

typedef struct Tnode s_tnode;

struct Tnode
{
    char *word;
    int count;
    struct tnode *left;
    struct tnode *right;
};

s_tnode *addtree(s_tnode *p, char *word)
{
    int cond;
    char *new_string;
    if (p == NULL)
    {
        p = (s_tnode *)malloc(sizeof(s_tnode)) ;
        new_string = (char *)malloc(sizeof(char)*strlen(word)+1);
        strcpy(new_string, word);
        p->word = new_string;
        p->count = 1;
        p->left = p->right = NULL;
    }
    else if((cond = strcmp(p->word, word)) == 0 )
        p->count++;
    else if (cond <0)
        p->left = addtree(p->left, word);
    else
        p->right = addtree(p->right, word);
    return p ;
}

void treeprint(s_tnode *p)
{
    if (p != NULL)
    {
        treeprint(p->left);
        printf("%4d %s\n", p->count, p->word);
        treeprint(p->right);
    }
}
