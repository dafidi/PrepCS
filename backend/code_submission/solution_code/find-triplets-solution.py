
"""
Given an array of integers, return all triplets that sum up to zero.
"""
def naive_find_triplets(lst):
    # Naive solution: O(n^3)   
    solution = []
    if not lst or len(lst) < 3:
        return solution
    
    
    for i in range(0, len(lst)-2):
        for j in range(i, len(lst)-1):
            for k in range(j, len(lst)):
                triplet = [lst[i], lst[j], lst[k]]
                if sum(triplet) == 0:
                    solution.append(triplet)

