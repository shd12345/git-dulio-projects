queue: main.o queue.o
	gcc -o queue main.o queue.o

main.o: main.c queue.h
	gcc -c main.c

queue.o: queue.c queue.h
	gcc -c queue.c

clean:
	rm queue
	rm *.o
	rm *~
