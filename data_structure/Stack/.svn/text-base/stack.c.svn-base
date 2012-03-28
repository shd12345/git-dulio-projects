#include "stdio.h"
#include "stdlib.h"
#include "string.h"

#include "stack.h"

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

void pop(List list){
	Node tmpNode;
	if (list->next == NULL){
		error(3);
	}
	else{
		tmpNode= list->next;
		list->next= list->next->next;
		free(tmpNode);
	}
}

void push(List list, char element[]){
	Node node;
	if ( (node=(Node)malloc(sizeof(struct node))) == NULL ){
		error(2);
	}
	else{
		strcpy(node->element, element);
		if (list->next == NULL){
			node->next= NULL;
			list->next= node;
		}
		else{
			node->next= list->next;
			list->next= node;
		}
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
