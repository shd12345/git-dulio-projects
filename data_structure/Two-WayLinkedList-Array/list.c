#include "stdio.h"
#include "stdlib.h"
#include "string.h"

#include "list.h"

static Node
myAlloc(void){
	Node node;
	node= MemSpace[0].next;
	MemSpace[0].next= MemSpace[node].next;
	return node;
}

static void
myFree(Node node){
	MemSpace[node].next= MemSpace[0].next;
	MemSpace[0].next=node;
}

void
initMemSpace(){
	int i;
	for(i=0; i<MEMORY_SIZE-1; i++){
		MemSpace[i].next = i+1;
	}
	MemSpace[MEMORY_SIZE-1].next = 0;
}

List
createList(){
	List list;
	if ( (list=myAlloc()) == 0){
		error(1);
		return 0;
	}
	else{
		strcpy(MemSpace[list].element, "header");
		MemSpace[list].next=0;
		return list;
	}
}

void
insertNode(List list, char element[], char beforeElement[]){
	Node newnode;
	Node node= search(list, beforeElement);

	if ( (newnode=(Node)myAlloc()) == 0 ){
		error(2);
	}
	else{
		if ( node==0 ) node= 1;
		if ( MemSpace[node].next == 0 ){
			strcpy(MemSpace[newnode].element, element);
			MemSpace[newnode].next= 0;
			MemSpace[node].next= newnode;
		}
		else{
			strcpy(MemSpace[newnode].element, element);
			MemSpace[newnode].next= MemSpace[node].next;
			MemSpace[node].next= newnode;
		}
	}
}

int
deleteNode(List list, char Element[]){
	Node preNode= searchPrev(list, Element);
	Node node= MemSpace[preNode].next;
	if (node==0){
		return 1;
	}
	else{
		if (node == list){
			return 2;
		}
		else{
			if (MemSpace[node].next == 0){
				//MemSpace[node]prev->next=NULL;
				//free(node);
			}
			else{
				MemSpace[preNode].next=MemSpace[node].next;
				myFree(node);
			}
			return 0;
		}
	}
}

void
printList(List list){
	int Count=0;
	char printCount[3];
	list=MemSpace[list].next;
	while(list != 0){
		Count++;
		sprintf(printCount, "%4d", Count);
		printf("[%s]\t%s\n", printCount, MemSpace[list].element);
		list=MemSpace[list].next;
	}
}

Node
search(List list, char element[]){
	while(list != 0){
		if (!strcmp(element, MemSpace[list].element)){
			return (Node)list;
		}
		list=MemSpace[list].next;
	}
	return 0;
}

Node
searchPrev(List list, char element[]){
	while(MemSpace[list].next != 0){
		if (!strcmp(element, MemSpace[MemSpace[list].next].element)){
			return (Node)list;
		}
		list=MemSpace[list].next;
	}
	return 0;
}

void
error(int ErrorCode){
	printf("Error: %d", ErrorCode);
}
