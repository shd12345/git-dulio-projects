calc: main.c libcalc.o getop.o io.o
	cc	main.c \
		libcalc.o \
		getop.o \
		io.o \
		-o calc

libcalc.o: libcalc.c 
	cc -c \
		libcalc.c

getop.o: getop.c io.c
	cc -c \
		getop.c \
		io.c \
