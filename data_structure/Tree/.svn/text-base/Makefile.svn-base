tree: main.o tree.o
	cc -o tree main.o tree.o

main.o: main.c tree.h
	cc -c main.c

stack.o: tree.c tree.h
	cc -c tree.c

clean:
	rm tree
	rm *.o
	rm *~
