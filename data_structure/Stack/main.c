
#include "stack.h"

void main(){
	List s= createList();
	push(s,"fucker1");
	push(s,"fucker2");
	push(s,"fucker3");
	push(s,"fucker4");
	pop(s);
	pop(s);
	printList(s, 0);
}
