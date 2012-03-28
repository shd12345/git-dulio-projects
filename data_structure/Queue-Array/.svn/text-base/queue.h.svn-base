/**
 * File
 *   /Queue/queue.h
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

struct QueueNode;
typedef struct QueueNode *Queue;

struct QueueNode{
	int Capacity;
	int Front;
	int Rear;
	int Size;
	int *Array;
};

#define MinQueueSize (5)

/**
 * main function defines
 */
int isEmpty(Queue queue);
int isFull(Queue queue);
Queue createQueue(int maxElementSize);
void enqueue(Queue queue, int element);
void dequeue(Queue queue, int printIt);
void printQueue(Queue queue, int printStyle);
void error(int errorCode);

/**
 * aid function defines
 */
static int getPosition(Queue queue, int position);
