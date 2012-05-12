
static void swap(char *v[], int i, int j);

void mqsort(char *v[], int size, int option)
{
    int i, j;
    int k;
    // 选择排序法
    for(i=0; i<size; i++)
    {
        // init from v[0]
        k=i;
        for(j=i+1; j<size; j++)
        {
            if(strcmp(v[k], v[j]) < 0)
                k = j;
            //printf("|%d",strcmp(v[i], v[j]));
        }
        swap(v, i, k);
    }
}

void swap(char *v[], int i, int j)
{
    char *tmp;
    tmp = v[i];
    v[i] = v[j];
    v[j] = tmp;
}
