def add_binary(a, b):
    current_index = 0
    result = ""
    carry = 0
    while current_index < max(len(a), len(b)) or carry: #Carry != 0
    	if current_index < len(a):
    		current_a_digit = a[-1-current_index]
    	else:
    		current_a_digit = "0"
    	if current_index < len(b):
    		current_b_digit = b[-1-current_index]
    	else:
    		current_b_digit = "0"

    	value = to_int(current_a_digit) + to_int(current_b_digit) + carry

    	result = str(value%2) + str(result) #Imp

    	if value > 1:
    		carry = 1
    	else:
    		carry = 0
        
    	current_index += 1
    
    return result


def to_int(character):
    if character == '1':
        return 1
    else:
        return 0

       