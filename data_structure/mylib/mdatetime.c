
int
date2day(int year, int month, int day)
{
    const int daytab[2][13] = {
        {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
        {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
    };
    int days = 0;
    int isleap;
    int i;

    // restrict parms
    if (year < 1 || year > 9999)
        return -1;
    if (month < 1 || month > 12 )
        return -1;
    isleap = is_leap(year);
    if (day < 1 || day > daytab[isleap][month])
        return -1;

    for(i = 1; i < month; i++)
        days += daytab[isleap][i];

    return days + day;
}

void
day2date(int year, int days, int *month, int *day)
{
    const int daytab[2][13] = {
        {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
        {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
    };
    int isleap;
    int i;

    if (year < 1 || year > 9999)
        return -1;
    isleap = is_leap(year);
    if (days < 1 || days > (isleap ? 366:365) )
        return -1;

    for(i=1; days
     > daytab[isleap][i]; i++)
        days -= daytab[isleap][i];

    *month = i;
    *day = days;
}

int
is_leap(int year)
{
    return (year % 4 == 0 && year % 100 != 0 ) || year % 400 == 0 ;
}
