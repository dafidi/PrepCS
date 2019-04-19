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
