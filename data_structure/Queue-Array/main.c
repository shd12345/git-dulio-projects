#include "queue.h"

void main()
{
	Queue q=createQueue(5);
	enqueue(q,101);
	enqueue(q,102);
	enqueue(q,103);
	enqueue(q,104);
	enqueue(q,104);
	enqueue(q,104);
	dequeue(q,0);
	enqueue(q,105);
	enqueue(q,106);
	dequeue(q,0);
	dequeue(q,0);
	dequeue(q,0);
	printQueue(q, 1);
}
