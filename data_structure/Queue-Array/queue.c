/**
 * File
 *   /Queue/queue.c
 * Title
 *   Queue Simple Sample
 * Category
 *   Data Structure
 * Author
 *   dulio(huadu.shen@gmail.com)
 * Date
 *   Sat Feb  4 10:32:10 CST 2012
 * Description
 *  
 */

#include "stdio.h"
#include "stdlib.h"
#include "string.h"

#include "queue.h"

int
isEmpty(Queue queue)
{
	return queue->Size <= 0;
}

int
isFull(Queue queue)
{
	return queue->Size >= queue->Capacity ;
}

Queue
createQueue(int maxElementSize)
{
	Queue q;
	if ( (q=(Queue)malloc(sizeof(struct QueueNode))) == NULL )
	{
		error(1);
		return NULL;
	}
	else
	{
		if(maxElementSize >= MinQueueSize)
		{
			q->Capacity= maxElementSize;
			q->Front= 1;
			q->Rear= 0;
			q->Size= 0;
			q->Array= NULL;
			if ( (q->Array=(int *)malloc(sizeof(int)*maxElementSize)) == NULL ){
				error(1);
				free(q);
				return NULL;
			}
			return q;
		}
		else
		{
			error(2);
			free(q);
			return NULL;
		}
	}
}

void
enqueue(Queue queue, int element)
{
	if (isFull(queue))
	{
		error(4);
	}
	else
	{
		queue->Size++;
		queue->Rear= getPosition(queue, queue->Rear);
		queue->Array[queue->Rear]= element;
	}
}

void
dequeue(Queue queue, int printIt)
{
	if (isEmpty(queue))
	{
		error(5);
	}
	else
	{
		queue->Size--;
		if (printIt)
		{
			printf("[\"%d\"]\tOut of Queue\n", queue->Array[queue->Front]);
		}
		queue->Front= getPosition(queue, queue->Front);
	}
}

void
printQueue(Queue queue, int printStyle)
{
	int * printPtr;
	int i, j;
	int count= 0;
	char printStr[30];

	printPtr= queue->Array;
	
	if ( !isEmpty(queue) )
	{
			// test area
			/*
			printf("Cap:%d\nFront:%d\nRear:%d\nSize:%d\n",
					queue->Capacity,
					queue->Front,
					queue->Rear,
					queue->Size
					);
			*/
		switch(printStyle)
		{
			case 1:
				strcpy(printStr, "<[ \"%d\" ]<");
				break;
			case 0:
			default:
				strcpy(printStr, "[%4d]\t%d\n");
				break;
		}

		printf("[ EXIT ]<<-");
		j= queue->Front;
		for(i=0 ;i<queue->Size; i++)
		{
			printf(printStr, queue->Array[j]);
			j= getPosition(queue, j);
		}
		printf("<-[ ENTER ]\n");
	}
	else{
		printf("Empty Queue\n");
	}
}

static int
getPosition(Queue queue, int position)
{
	if ( ++position >= queue->Capacity )
	{
		position= 0;
	}
	return position;
}

void
error(int errorCode){
	printf("Warning: ErrorCode: %d\n", errorCode);
}
