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
    # This solution works using XOR
    print "The original value of a is " + str(a)
    print "The original value of b is " + str(b)
    a = a ^ b
    b = a ^ b
    a = a ^ b
    print "The value of a is now " + str(a)
    print "The value of b is now " + str(b)

#########################################
"""
Write a function that adds two numbers. You should not use + or any
arithmetic operators.
"""
def add(first_number, second_number):
    if second_number == 0:
        return first_number

    # first add without considering "carry" - this is equivalent to XOR
    sum_without_carry = first_number ^ second_number

    # then add with only the "carry" - this is equivalent to AND and left shift 1
    carry = (first_number & second_number) << 1

    # add the sum without carry and the carry
    # need to recurse since you are not allowed to use arithmetic operators
    return add(sum_without_carry, carry)

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
"""
Write a function to determine the number of bits you would need to flip 
to convert integer A to integer B
"""
def bits_to_flip(first_int, second_int):
    # the XOR of the two integers produces another integer whose 1 bits represent the bits that are different in the two numbers
    different_bits = first_int ^ second_int
    
    # count number of 1 bits in XOR
    bit_count = 0
    while different_bits != 0:
        if different_bits & 1 == 1:
            bit_count = bit_count + 1
        different_bits = different_bits >> 1
    
    return bit_count
#########################################
"""
Write a function that determines the number of 1 bits in the binary
representation of a given integer
"""
def number_of_ones(integer_value):
    """
    You can AND integer value with a "mask": 1
    This way, if the rightmost bit is 1, the result will be 1
    And if the rightmost bit is 0, the result will be 0
    Each time you do this, right shift one place so you can compare
    the next bit.
    O(n) - where n is the number of bits
    """
    one_count = 0
    while integer_value != 0:
        bit_is_one = integer_value & 1
        if bit_is_one:
            one_count = one_count + 1

        integer_value = integer_value >> 1

def number_of_ones2(integer_value):
    """
    Another way to do this is to subtract 1 from the integer_value
    Doing this flips all the bits up to and including the rightmost 1.
    AND-ing the result of the subtraction and the original integer results
    in a new number that is the same as the original number except that the
    rightmost 1 is now a 0. Count the number of times you can do this before
    the number becomes 0.
    
    This is more efficient O(m) where m is the number of 1 bits
    """
    
    one_count = 0
    while integer_value != 0:
        one_subtracted = integer_value - 1
        integer_value = one_subtracted & integer_value
        one_count = one_count + 1



"""
===================================================================================
                                      HARD
===================================================================================
"""


#########################################
"""
Given a real number between 0 and 1 (e.g. 0.72) that is passed in as a double,
print the binary representation. If the number cannot be represented accurately
in binary with at most 32 characters, print "ERROR"
"""
def get_binary_rep(real_number):
    """
    Compare the number to 0.5, 0.25, ...
    This is based on the idea that each binary digit after the decimal point
    represents successive divisions of the digit by powers of 2
    """
    if real_number > 1 or real_number < 0:
        return "ERROR"

    binary_rep = "."
    fraction = 0.5
    while real_number > 0:
        if len(binary_rep) > 32:
            return "ERROR"

        if real_number > fraction:
            binary_rep = binary_rep + "1"
        else:
            binary_rep = binary_rep + "0"

        real_number = real_number - fraction
        fraction = fraction / 2

    return binary_rep
#########################################
"""
Reverse bits of a given 32-bit unsigned integer.
For example, given input 43261596 (represented in binary as 
00000010100101000001111010011100), return 964176192 (represented in binary as 
00111001011110000010100101000000).
"""
def reverse_bits(n):
    """
    Repeatedly shift right and bitwise and each bit to 1
    If the bit is 0, then the bitwise and operation is 0
    If the bit is 1, then the bitwise and operation is 1
    """
    
    if n == 0:
        return 0
    
    current_value = n
    reversed_bin_string = ""
    for i in range(0, 32):
        if current_value & 1 == 1:
            reversed_bin_string = reversed_bin_string + "1"
        else:
            reversed_bin_string = reversed_bin_string + "0"
        
        current_value = current_value >> 1
    
    return int(reversed_bin_string, 2)


#########################################