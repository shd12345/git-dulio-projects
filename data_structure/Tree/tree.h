/**
 * File
 *   /Tree/tree.h
 * Title
 *   Queue Simple Sample
 * Category
 *   Data Structure
 * Author
 *   dulio(huadu.shen@gmail.com)
 * Date
 *   Sun Feb  5 00:24:11 CST 2012
 * Description
 * 
 */

struct StructTree
{
	char element[30];
	struct TreeNode * left;
	struct TreeNode * right;
	int depth;
};

typedef struct StructTree * PtrToNode;
typedef PtrToNode Tree;

Tree createTree();
void printTree(Tree tree);
void printTree(Tree tree);
static void listDir(Tree tree, int Depth);
