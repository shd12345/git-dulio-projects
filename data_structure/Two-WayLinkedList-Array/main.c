#include "stdio.h"

#include "list.h"

int main(int argc, char *argv){
	initMemSpace();

	List l;
	l= createList();

	insertNode(l, "fuck 1", "header");
	insertNode(l, "fuck 2", "header");
	insertNode(l, "fuck 3", "header");
	insertNode(l, "fuck 4", "header");
	insertNode(l, "fuck 5", "header");
	insertNode(l, "fuck 6", "header");
	insertNode(l, "fuck 7", "header");
	deleteNode(l, "fuck 2");
	printList(l);

	return 0;
}
