linkedlist: main.o list.o
	cc -o linkedlist main.o list.o

main.o: main.c
	cc -c main.c

list.o: list.c list.h
	cc -c list.c

clean: 
	rm -r *.o *~ linkedlist
