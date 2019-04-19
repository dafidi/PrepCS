def majority_element(input_list):
    majority = len(input_list) // 2
    appearance_map = {}
    for i in range(0, len(input_list)):
        if input_list[i] in appearance_map:
            appearance_map[input_list[i]] = appearance_map[input_list[i]] + 1
        else:
            appearance_map[input_list[i]] = 1
    
    for element in appearance_map:
        if appearance_map[element] > majority:
            return element
    
    return 0
