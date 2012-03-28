stack: main.o stack.o
	cc -o stack main.o stack.o

main.o: main.c
	cc -c main.c

stack.o: stack.c
	cc -c stack.c

clean:
	rm stack
	rm *.o
	rm *~
