
def is_valid_parentheses(input_string):
    character_map = {'(':')', '{':'}', '[':']'}
    stack = []
    string_list = list(input_string)
    for character in string_list:
        if character == '(' or character == '{' or character == '[':
            stack.append(character)
        else:
            if len(stack) == 0:
                return False
            
            top = stack.pop()
            if character_map[top] != character:
                return False
            
    
    if len(stack) != 0:
        return False
    
    return True
