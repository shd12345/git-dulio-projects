PROJECT=main.c libcalc.o getop.o io.o
CC=cc
RM=rm

calc: $(PROJECT)
	$(CC) -o calc \
		$(PROJECT)

libcalc.o: libcalc.c 
	$(CC) -c \
		libcalc.c

getop.o: getop.c io.c
	$(CC) -c \
		getop.c \
		io.c

clean:
	$(RM) *.o
	$(RM) calc
