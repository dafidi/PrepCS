"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
class BinaryTree:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
    def InsertLeft(self, data):
        if self.left == None:
            self.left = BinaryTree(data)
        else:
            tree = BinaryTree(data)
            tree.left = self.left
            self.left = tree
    def InsertRight(self, data):
        if self.right == None: #same as not
            self.right = BinaryTree(data)
        else:
            tree = BinaryTree(data)
            tree.right = self.right
            self.right = tree
    def __str__(self):
        return str(self.data)
#########################################
"""
Pre-Order
"""
def print_tree_preorder(tree):
    if tree == None: 
        return
    print (tree.data)
    print_tree_preorder(tree.left)
    print_tree_preorder(tree.right)
#########################################
"""
Post-Order
"""
def print_tree_postorder(tree):
    if tree == None: 
        return
    print_tree_postorder(tree.left)
    print_tree_postorder(tree.right)
    print (tree.data)
#########################################
"""
In-Order
"""
def print_tree_inorder(tree):
    if tree == None: 
        return
    print_tree_inorder(tree.left)
    print (tree.data)
    print_tree_inorder(tree.right)
"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
"""
Given a binary tree, find its maximum depth.
The maximum depth is the number of nodes along the longest path from the root 
node down to the farthest leaf node.
"""
def maximum_depth(node):
    if not node:
        return 0
    
    return 1 + max(maximum_depth(node.left), maximum_depth(node.right))


#########################################
"""
Find the sum of left leaves in a given binary tree.
Example:
            3
           / \
          9  20
            /  \
           15  7
There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.
"""
def sum_of_left_leaves(root):

    if not root:
        return 0

    if root.left and not root.left.left and not root.left.right:
        return root.left.data + sum_of_left_leaves(root.right)

    return sum_of_left_leaves(root.left) + sum_of_left_leaves(root.right)

#########################################
"""
Given two binary trees, write a function to check if they are equal or not.
Two binary trees are considered equal if they are structurally identical and 
the nodes have the same value.
"""
def is_same_tree(first_tree, second_tree):
    if not first_tree and not second_tree:
        return True
    
    if not first_tree:
        return False
    
    if not second_tree:
        return False
    
    if first_tree.data == second_tree.data:  
        left_is_equal = is_same_tree(first_tree.left, second_tree.left)
        right_is_equal = is_same_tree(first_tree.right, second_tree.right)
        
        if left_is_equal and right_is_equal:
            return True
    
    return False


#########################################
"""
Invert a binary tree.
         4                        4
      /    \                    /   \
    2       7                  7     2 
   /  \   /  \                / \   / \
  1    3 6    9              9   6 3   1
  
"""
def invert_binary_tree(tree):
    if not tree:
        return tree #Same as returning None
    if tree.left:
        invert_binary_tree(tree.left)
    if tree.right:
        invert_binary_tree(tree.right)
    tree.left, tree.right = tree.right, tree.left
    return tree

def invertTree(tree):
        queue = []
        if tree:
            queue.append(tree)
        while queue:
            current = queue.pop()
            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)
            current.left, current.right = current.right, current.left
        return tree
#########################################
"""
Implement a function to check if a binary tree is balanced. For the purposes
of this question, a balanced tree is defined to be a tree such that the heights
of the two subtrees of any node never differ by more than one.
"""
def check_height(root):
    if not root:
        return 0

    left_height = check_height(root.left)
    if left_height == -1:
        return -1 # not balanced

    right_height = check_height(root.right)
    if right_height == -1:
        return -1 # not balanced

    height_difference = abs(left_height - right_height)
    if height_difference > 1:
        return -1
    else:
        return max(left_height, right_height) + 1

def is_balanced(root):
    if check_height(root) == -1:
        return False
    else:
        return True

#########################################

"""
===================================================================================
                                      HARD
===================================================================================
"""

#########################################
""" BST
Given a sorted (increasing order) array with unique integer elements, write 
an algorithm to create a binary search tree with minimal height.
"""
def create_minimal_bst(list_of_integers, start, end):
    if end < start:
        return None
    
    # get the middle element of the list
    middle = (start + end) // 2
    root = BinaryTree(list_of_integers[middle], create_minimal_bst(list_of_integers, start, middle-1), create_minimal_bst(list_of_integers, middle+1, end))
    return root

#########################################
""" BST
Implement a function to check if a binary tree is a binary search tree.
"""
def is_binary_tree(bintree_node, min, max):
    # perform a depth first search while checking the rules of a binary tree
    # pass down the restrictions (min and max)
    """
    All the left children of a node can have a MAX value of the parent node
    All the right children of a node can have a MIN value of the parent node
    """
    if not bintree_node:
        return True    
    
    if bintree_node.data >= min and bintree_node.data <= max:
        if bintree_node.left:
            left_tree_binary =  is_binary_tree(bintree_node.left, min, bintree_node.data)
            if not left_tree_binary:
                return False
        
        if bintree_node.right:
            right_tree_binary = is_binary_tree(bintree_node.right, bintree_node.data, max)
            if not right_tree_binary:
                return False
       
    else:
        return False
    
    return True
