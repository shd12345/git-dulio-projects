#define MEMORY_SIZE 10

typedef int PtrToNode;
typedef PtrToNode List;
typedef PtrToNode Node;

struct node{
	char element[50];
	Node next;
};

struct node MemSpace[MEMORY_SIZE];

static Node myAlloc(void);
static void myFree(Node node);

void initMemSpace();
List createList();
Node search(List list, char element[]);
Node searchPrev(List list, char element[]);
int deleteNode(List list, char element[]);
void insertNode(List list, char element[], char beforeElement[]);
void printNode(List list);
void error(int ErrorCode);
