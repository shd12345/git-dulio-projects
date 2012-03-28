#include "stdio.h"
#include "stdlib.h"
#include "string.h"

#include "list.h"

/**
 * Linked List Functions
 */
List
createList(){
	List newList;
	if ( (newList=(List)malloc(sizeof(struct node))) == NULL ){
		error(1);
		return NULL;
	}
	else{
		newList->next=NULL;
		strcpy(newList->element, "header");
		return newList;
	}
}

Node
createNode(char element[]){
	Node NewNode;
	if ( (NewNode=(Node)malloc(sizeof(struct node))) == NULL ){
		error(2);
		return NULL;
	}
	else{
		return NewNode;
	}
}

// print a list
void
printList(List list, int printMethod){
	int Count=0;
	char printCount[3];

	list=list->next;
	if (list==NULL){
		printf("Empty List\n");
	}
	else{
		while(list!=NULL){
			Count++;
			sprintf(printCount, "%4d", Count);
			printf("[%s]\t%s\n",printCount,list->element);
			list=list->next;
		}
	}
}

void
insertNode(List list, char element[], char beforeElement[]){
	Node NewNode;
	// find the node of beforeElement[]
	Node node= search(list, beforeElement);

	// malloc a new Node
	if ( (NewNode=(Node)malloc(sizeof(struct node))) == NULL ){
		error(2);
	}
	else
	{
		// if cannot find the node of beforeElement[], set it Header.
		if (node==NULL) node=list;

		if (node->next == NULL){
		// if node is the last node
			strcpy(NewNode->element, element);
			NewNode->next=NULL;
			node->next=NewNode;
		}
		else{
		// if node is not the last node
			strcpy(NewNode->element, element);
			NewNode->next=node->next;
			node->next= NewNode;
		}
	}
}

int
deleteNode(List list, char Element[]){
	Node prevNode= searchPrev(list, Element);
	Node node= prevNode->next;
	if (node==NULL){
		return 1;
	}
	else{
		if (prevNode==NULL){
			return 2;
		}
		else{
			if (node->next==NULL){
				prevNode->next=NULL;
				free(node);
			}
			else{
				prevNode->next=node->next;
				free(node);
			}
			return 0;
		}
	}
}

Node
search(List list, char element[]){
	while(list!=NULL){
		if (!strcmp(element, list->element)){
			return list;
		}
		list=list->next;
	}
	return NULL;
}

Node
searchPrev(List list, char element[]){
	while(list->next!=NULL){
		if (!strcmp(element, list->next->element)){
			return list;
		}
		list=list->next;
	}
	return NULL;
}

void
error(int errorCode){
	char ErrorMessage[50];
	switch(errorCode){
		case 1:
			strcpy(ErrorMessage, "FATAL ERROR: MALLOC LIST ERROR");
			break;
		case 2:
			strcpy(ErrorMessage, "FATAL ERROR: MALLOC LIST ERROR");
			break;
		default:
			strcpy(ErrorMessage, "Unknown ERROR");
	}
	printf("%s\n", ErrorMessage);
}
