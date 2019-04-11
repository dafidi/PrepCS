"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
"""
Write a function to swap a number in place (that is, without temporary variables)
"""
def swap(a, b):
    print ("Original value of a is " + str(a))
    print ("Original value of b is " + str(b))
    a = a - b
    b = b + a
    a = b - a

    print ("a is now " + str(a))
    print ("b is now " + str(b))

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
"""
Given an integer, write a function to determine if it is a power of three.
"""
def is_power_of_three(number):
    while number >= 3:
        number = number / 3.0

    return number % 1 == 0
"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
"""
Write methods to implement the multiply, subtract and divide operations for 
integers. Use only the add operator.
"""
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

#########################################
"""
Given two lines on a Cartesian plane, determine whether the two lines would 
intersect.
"""
class Line:
    def __init__(self, slope, yIntercept):
        self.slope = slope
        self.yIntercept = yIntercept

def intersect(line1, line2):
    """
    If two different lines are not parallel, then they intersect.
    To check if two lines intersect, we just need to check if the slopes are 
    different (or if the lines are identical) because Identical are equal.
    
    Note: Due to the limitations of floating point representations, never check 
    for equality with ==. Instead, check if the difference is less than an 
    epsilon value.
    """
    epsilon = 0.000001 # used for floating point comparisons
    return abs(line1.slope - line2.slope) > epsilon or abs(line1.yIntercept - line2.yIntercept) < epsilon;

#########################################s