#include "stdio.h"
#include "string.h"

#include "list.h"

void main(){
	List l= createList();
	insertNode(l,"fuckit 1","header");
	insertNode(l,"fuckit 2","header");
	insertNode(l,"fuckit 3","");
	insertNode(l,"fuckit 4","header");
	insertNode(l,"fuckit 5","header");
	insertNode(l,"fuckit 6","header");
	insertNode(l,"fuckit 7","");
	insertNode(l,"fuckit 8","header");
	insertNode(l,"fuckit 9","");
	deleteNode(l,"fuckit 9");
	insertNode(l,"fuckit 10","");
	insertNode(l,"fuckit 11","");
	printList(l, 1);
}
