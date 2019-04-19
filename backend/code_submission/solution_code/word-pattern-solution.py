def word_pattern(pattern, string):
    pattern_str = {}
    str_pattern = {}
    pattern_lst = list(pattern)
    str_lst = string.split()
    
    if len(pattern_lst) != len(str_lst):
        return False
    #Zip to create iterator from each of the iterables
    for key, value in zip(pattern_lst, str_lst):
        if key in pattern_str:
            if pattern_str[key] != value:
                return False
        elif value in str_pattern:
            if str_pattern[value] != key:
                return False
        else:
            pattern_str[key] = value
            str_pattern[value] = key
    
    return True
