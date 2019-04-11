"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
"""
A child is running up a staircase with n steps, and can hope either 1 step,
2 steps, or 3 steps at a time. Implement a method to count how many possible
ways the child can run up the stairs.
"""
def count_ways(number_of_steps):
    """
    The total number of ways of reaching the last step is therefore the
    sum of the number of ways of reaching the last three steps
    This solution is O(3^N) since there are three recursive calls at each level
    """
    if number_of_steps < 0:
        return 0

    if number_of_steps == 0:
        return 1

    return count_ways(number_of_steps-1) + count_ways(number_of_steps-2) + count_ways(number_of_steps-3)

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
"""
A magic index in an array A[1...n-1] is defined to be an index such that 
A[i] = i. Given a sorted array of distinct integers, write a method to find a magic 
index, if one exists, in array A.
"""
def find_magic_index(integer_list, start_index, end_index):
    """
    There is a linear time brute force solution which examines each element in 
    the list and checks to see if it is equal to its index. However, an approach 
    similar to binary search can be used to achieve O(log n) time complexity.
    
    This only works properly when the elements are distinct.
    """
    if end_index < 0 or start_index == len(integer_list):
        return None
    
    list_length = len(integer_list)
    middle_index = (start_index + end_index) // 2
    middle_element = integer_list[middle_index]
    if middle_element == middle_index:
        return middle_index
    elif middle_element < middle_index:
        return find_magic_index(integer_list, middle_index+1, end_index)
    else:
        return find_magic_index(integer_list, start_index, middle_index - 1)

#########################################
"""
A magic index in an array A[1...n-1] is defined to be an index such that 
A[i] = i. Given a sorted array of non-distinct integers, write a method to find a magic index, if one exists, in array A.
"""
def find_magic_index(sorted_array, start, end):
    """
    When the elements in the sorted array are non-distinct, then we need to 
    search both the left and right sides recursively
    """
    if sorted_array == [] or end < start or start < 0 or end == len(sorted_array):
        return None
    
    middle_index = (start + end) // 2
    middle_element = sorted_array[middle_index]
    if middle_element == middle_index:
        return middle_index
    
    # search right side
    rightIndex = max(middle_index + 1, middle_element)
    right = find_magic_index(sorted_array, rightIndex, end)
    if right: #If statement not present, will return None
        return right
    
    # search left side
    leftIndex = min(middle_index - 1, middle_element)
    left = find_magic_index(sorted_array, start, leftIndex)
    if left:
        return left

#Or y'know just use an interative loop. - Aarya

"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
"""
Implement a function that prints all possible combinations of the characters 
in a string. These combinations range in length from one to the length of the 
string. Two combinations that differ only in ordering of their characters are 
the same combination. In other words, "12" and "31" are different combinations 
from the input string "123", but "21" is the same as "12".
"""
class Combinations:
    def __init__(self, input_string):
        # constructor 
        self.input_string = input_string
        self.comb_string = ""
        self.do_combinations(0)

    def do_combinations(self, start):
        i = start;
        while i < len(self.input_string):
            self.comb_string = self.comb_string + self.input_string[i]
            print (self.comb_string)
            self.do_combinations(i+1)
            self.comb_string = self.comb_string[:-1]
            i = i + 1
def combinations_solutions(input_string, i, combined_string):
    while i < len(input_string):
        combined_string = combined_string + input_string[i]
        print (combined_string)
        combinations_solutions(input_string, i+1, combined_string)
        combined_string = combined_string[:-1] #Removes last letter
        i = i + 1

# combinations_solutions("wxyz", 0, "")
# if __name__ == '__main__':
#     combinations = Combinations("wxyz", 0)
#########################################
"""
Implement a routine that prints all possible orderings of the characters in a 
string. In other words, print all permutations that use all the characters 
from the original string. 
For example, given the string "hat", your function should 
print the strings "tha", "aht", "tah", "ath", "hta", and "hat". Treat each 
character in the input string as a distinct character, even if it is repeated. 
Given the string "aaa", your routine should print "aaa" six times. You may print 
the permutations in any order you choose.
"""
class Permutation:
    def __init__(self, string):
        # create the boolean list/array that keeps track of whether a character 
        # has been used 
        self.used = {}
        for character in string:
            self.used[character] = False

        self.string = string
        self.permuted_string = ""
        self.do_permutation()

    def do_permutation(self):
        if len(self.permuted_string) == len(self.string):
            print (self.permuted_string)
            return
        else:
            for character in self.string:
                if self.used[character]:
                    continue
                self.permuted_string = self.permuted_string + character
                self.used[character] = True
                self.do_permutation()
                self.used[character] = False
                self.permuted_string = self.permuted_string[:len(self.permuted_string)-1]

if __name__ == "__main__":
    permutation = Permutation("abcd")
#########################################
"""
A robot is located at the top-left corner of a m x n grid (marked "Start" in the diagram below). The robot can only
move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid
(marked "Finish" in the diagram below).
Now consider if some obstacles are added to the grids. How many unique paths would there be? An obstacle and empty space
is marked as 1 and 0 respectively in the grid.
Note: m and n will be at most 100.
Example 1:
Input:
[
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above. There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
https://leetcode.com/problems/unique-paths-ii/description/
"""


def unique_paths_with_obstacles(obstacle_grid):
    if obstacle_grid[0][0] == 1:
        return 0

    solutions = [[0 for _ in range(len(obstacle_grid[0]))] for _ in range(len(obstacle_grid))]
    solutions[0][0] = 1
    for i in range(len(obstacle_grid)):
        for j in range(len(obstacle_grid[0])):
            if obstacle_grid[i][j] != 1:
                if i-1 >= 0:
                    solutions[i][j] += solutions[i-1][j]

                if j-1 >= 0:
                    solutions[i][j] += solutions[i][j-1]

    return solutions[len(obstacle_grid)-1][len(obstacle_grid[0])-1]

#########################################