#ifndef NORMAL
#define NORMAL 0;
#define REVERSE 1;
#endif

typedef struct node *NodePointer;
typedef NodePointer Node;
typedef NodePointer List;

struct node{
	char element[20];
	struct node * prev;
	struct node * next;
};

List	createList();
void	printList(List list, int printMethod);
int		deleteNode(List list, char element[]);
void	insertNode(List list, char element[], char beforeElement[]);
Node	search(List list, char element[]);
void	error(int ErrorCode);
