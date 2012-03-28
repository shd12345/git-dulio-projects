#include <stdio.h>
#include <stdlib.h>

#define MAXOP	100
#define NUMBER	'0'

int getop(char []);
void push(double);
double pop(void);

int main(void)
{
	int type;
	double op1;
	double op2;
	char s[MAXOP];

	while((type = getop(s)) != EOF)
	{
		switch (type)
		{
			case NUMBER:
				push(atof(s));
				break;
			case '+':
				push(pop()+pop());
				break;
			case '-':
				op2 = pop();
				push(pop() - op2);
				break;
			case '*':
				push(pop() * pop());
				break;
			case '/':
				op2 = pop();
				if (op2 != 0.0)
					push(pop()/op2);
				else
					printf("error: zero divisor\n");
				break;
			case '%':
				op1 = pop();
				op2 = pop();
				if (op2 != 0.0)
					push(op2 - (int)op2 / (int)op1 * op1 );
				else
					printf("erroe: zero devisor\n");
				break;
			case '\n':
				printf("\t%.8g\n", pop());
				break;
			default:
				printf("error: unknown command %s\n", s);
				break;
		}
	}

	return 0;
}
