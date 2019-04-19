def negate(value):
    # negates the value of its integer argument
    if value > 0:
    	add_value = -1
    else:
    	add_value = 1
    negated_value = 0
    
    while value != 0:
        negated_value = negated_value + add_value
        value = value + add_value
    
    return negated_value

def absolute(value):    
    if value < 0:
        absolute_value = negate(value)
    else:
        absolute_value = value
    
    return absolute_value

def subtract(left_value, right_value):
    return left_value + negate(right_value)

def multiply(left_value, right_value): 
    result = 0
    abs_right_value = absolute(right_value)
    for i in range(0, abs_right_value):
        result = result + left_value
    
    if right_value < 0:
        result = negate(result)
    
    return result

def divide(first_value, second_value):
    # x = a / b is the same as a = bx  
    if second_value == 0:
        return "Error: division by zero"  
    if first_value == 0:
        return 0
    
    result = 0
    mul_value = 0
    abs_first_value = absolute(first_value)
    abs_second_value = absolute(second_value)
    
    while mul_value < abs_first_value:
        mul_value = mul_value + abs_second_value
        if mul_value <= first_value:
            result = result + 1
    
    # the result is negative if the signs are different
    if first_value > 0 and second_value < 0:
        result = negate(result)
    elif first_value < 0 and second_value > 0:
        result = negate(result)
    
    return result
