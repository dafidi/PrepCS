
def reverse_integer(number): 
    is_negative = False
    if number < 0:
        is_negative = True
    
    absolute_number = abs(number)
    
    # one may use the integer_to_string.py method here
    reversed_string = str(absolute_number)[::-1] # reverses a string
    reversed_int = int(reversed_string)
        
    if reversed_int > 2**31:
        return 0
    
    if is_negative:
        reversed_int = reversed_int * -1
    
    return reversed_int
