def find_triplets(lst):
    """
    This solution achieves O(n^2) time complexity with no extra space requirements
    """ 
    if not lst or len(lst) < 3:
        print(None)
    
    lst.sort()
    
    third_idx = len(lst) - 1
    first_idx = 0
    second_idx = first_idx + 1
    
    while third_idx > second_idx:
        sum = lst[first_idx] + lst[second_idx] + lst[third_idx]
        if sum > 0:
            third_idx = third_idx - 1
        elif sum < 0:
            second_idx = second_idx + 1
        else:
            print [lst[first_idx], lst[second_idx], lst[third_idx]]
            first_idx = first_idx + 1
            second_idx = first_idx + 1
