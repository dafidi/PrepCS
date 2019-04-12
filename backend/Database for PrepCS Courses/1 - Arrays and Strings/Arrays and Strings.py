"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Write a function that reverses a string.
"""
def reverse_string(string):
    string = string[::-1]

    return string

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Write a function that reverses the order of the words in a string.
"""
def reverse_words2(string):
    string = string[::-1]
    string_list = string.split()
    word_count = len(string_list)
    for word_index in range(0, word_count):
        word = string_list[word_index]
        reversed_word = word[::-1]
        string_list[word_index] = reversed_word

    return ' '.join(string_list)

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Reverse digits of an integer
"""
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

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
For example, "A man, a plan, a canal: Panama" is a palindrome.
"""
def is_palindrome(s):
    start = 0
    end = len(s) - 1
    
    while start < end:
        start_character = s[start].lower()
        end_character = s[end].lower()
        if not start_character.isalnum():
            start = start + 1
            continue
        
        if not end_character.isalnum():
            end = end - 1
            continue
        
        if start_character != end_character:
            return False
            
        start = start + 1
        end = end - 1
    
    return True

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Given an array of integers, return all triplets that sum up to zero.
"""
def naive_find_triplets(lst):
    # Naive solution: O(n^3)   
    if not lst or len(lst) < 3:
        print None
        
    for i in range(0, len(lst)-2):
        for j in range(i, len(lst)-1):
            for k in range(j, len(lst)):
                triplet = [lst[i], lst[j], lst[k]]
                if sum(triplet) == 0:
                    print triplet

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
'''
Given a non-negative integer "num", repeatedly add all its digits until the 
result has only one digit.
For example, 
Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one 
digit, return it.
'''
def addDigits(self, num):
        '''
        if num == 0:
            return num
        else:
            return (num - 1) % 9 + 1
        '''
        if len(str(num)) == 1:
            return num
        sum = 0
        for var in str(num):
            sum += int(var)
        return ddDigits(sum)



#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Given two strings s and t which consist of only lowercase letters.
String t is generated by random shuffling string s and then add one more letter at a random position.
Find the letter that was added in t.
"""
def findTheDifference(s, t):
    letters = "abcdefghijklmnopqrstuvwxyz"
    for x in letters:
        if s.count(x) != t.count(x):
            return x
    #Or Use Hash Mapping

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################

"""
Given a string s consists of upper/lower-case alphabets and empty space characters 
' ', return the length of the last word in the string.
If the last word does not exist, return 0.
"""
def last_word_length(input_string):
    trimmed_string = input_string.strip()
    if trimmed_string == "":
        return 0
    
    # start at the end of the string
    position = len(trimmed_string) - 1
    while position >= 0:
        if trimmed_string[position] == " ":
            break   
        position = position - 1
    
    last_word = trimmed_string[(position+1):]
    return len(last_word)

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Given an array and a value, remove all instances of that value in place and return the new length.
"""
def remove_element(input_array, elem):
    src_index = 0
    dst_index = 0
    while src_index < len(input_array):
        if input_array[src_index] == elem:
            input_array[dst_index] = input_array[src_index]
            dst_index = dst_index + 1
            
        src_index = src_index + 1
    
    return len(input_array[0:dst_index])

#########################################
'''
EASY EASY EASY EASY EASY EASY EASY EASY
'''
#########################################
"""
Given a sorted array, remove the duplicates in place such that each element appears only once and return the new length
"""
#Can use Hash Table too
def remove_duplicates(input_array):  
    if len(input_array) == 0:
        return 0  
    if len(input_array) == 1:
        return 1     
    dst_index = 0
    src_index = 1
    while src_index < len(input_array):
        if input_array[src_index] == input_array[dst_index]:
            src_index = src_index + 1
        else:
            input_array[dst_index+1] = input_array[src_index]
            dst_index = dst_index + 1
            src_index = src_index + 1
    
    return dst_index + 1

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Implement an algorithm to determine if an algorithm contains all unique
characters.
"""
def unique_characters(my_string):
    if my_string == "":
        return True
    character_count = {}
    for character in my_string:
        if character in character_count:
            return False
        else:
            character_count[character] = 1
    return True

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Write an efficient function to find the first non-repeated character in a string.
For instance, the first nonrepeated character in "total" is 'o' and the first
nonrepeated character in "teeter" is r.
"""
def findFirstNonRepeated(string):
    char_dict = {}
    for character in string:
        if character in char_dict:
            char_dict[character] = char_dict[character] + 1
        else:
            char_dict[character] = 1

    for character in string:
        if char_dict[character] == 1:
            return character

    return None

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given an array of size n, find the majority element. The majority element is the element that appears more than floor(n/2) times.
You may assume that the array is non-empty and the majority element always 
exists in the array.
"""
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
#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Write an efficient function that deletes characters from an ASCII string.
"""
def remove_specified_chars1(string, removechars):
    if string == "" or removechars == "":
        return string
        #Because Hashing is faster look up!
    new_string = ""
    chars_dict = {}
    for rem_char in removechars:
        if rem_char not in chars_dict:
            chars_dict[rem_char] = 1

    for string_char in string:
        if string_char not in chars_dict:
            new_string = new_string + string_char

    return new_string

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given two arrays, write a function to compute their intersection.
Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2]
Note: 
- Each element in the result should appear as many times as it shows in both arrays
- The result can be in any order
"""
def find_intersection(first_num_lst, second_num_lst):
    num_hash = {} #Basic to create Hash Mapping
    for num in first_num_lst:
        if num in num_hash:
            num_hash[num] = num_hash[num] + 1
        else:
            num_hash[num] = 1
    
    intersection_lst = []
    for num in second_num_lst:
        if num in num_hash and num_hash[num] > 0:
            intersection_lst.append(num)
            num_hash[num] = num_hash[num] - 1
    
    return intersection_lst
#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given two strings s and t, write a function to determine if t is an anagram of s. Anagram is rearrangement
"""
#Or use count
def is_anagram(s, t):
    if len(s) != len(t):
        return False
    
    letters_hash = {}
    for character in s:
        if character in letters_hash:
            letters_hash[character] = letters_hash[character] + 1
        else:
            letters_hash[character] = 1
    
    for character in t:
        if character in letters_hash and letters_hash[character] > 0:
            letters_hash[character] = letters_hash[character] - 1
        else:
            return False
    
    return True

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.
One longest palindrome that can be built from input "abccccdd" is "dccaccd", whose length is 7.
"""
def longest_palindrome(input_str):
    char_dict = {}
    for character in input_str:
        if character in char_dict:
            char_dict[character] = char_dict[character] + 1
        else:
            char_dict[character] = 1

    even_sum = 0
    odd_chars = False
    for char_key in char_dict:
        if char_dict[char_key] % 2 == 0:
            even_sum = even_sum + char_dict[char_key]
        else:
            even_sum = even_sum + (char_dict[char_key] - 1)
            odd_chars = True

    if odd_chars:
        return even_sum + 1

    return even_sum
#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Write a function to find the longest common prefix string amongst an array 
of strings
"""
def longest_common_prefix(string_lst):
    if not string_lst:
        return ""
    
    # find shortest string length first
    shortest = len(string_lst[0])
    for string in string_lst:
        length = len(string)
        if length < shortest:
            shortest = length
            
    # compare each character of each string
    longest_prefix = ""
    for str_index in range(0, shortest):
        current_char = string_lst[0][str_index]
        for lst_index in range(1, len(string_lst)):
            if string_lst[lst_index][str_index] != current_char:
                return longest_prefix
        
        longest_prefix = longest_prefix + current_char
    
    return longest_prefix

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given two strings, write a function to determine if one is a permutation
of the other.
"""
def is_permutation_2(first_string, second_string):
    """
    Another way to approach this problem is to keep track of character
    counts - this approach is more efficient.
    """
    length_of_first = len(first_string)
    length_of_second = len(second_string)
    if length_of_first > length_of_second:
        return False

    character_dict = {}
    for character in first_string:
        if character in character_dict:
            character_dict[character] = character_dict[character] + 1
        else:
            character_dict[character] = 1

    for character in second_string:
        if character in character_dict:
            character_dict[character] = character_dict[character] - 1
            if character_dict[character] < 0:
                return False
        else:
            return False

    return True


#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given a column title as appears in an Excel sheet, return its corresponding column number.
A -> 1
...
Z -> 26
AA -> 27
"""
def title_to_number(column_title):
    # this is pretty much a base 26 number system
    if column_title.strip() == '':
        return 0
    
    char_map = {}
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for i in range(0, len(characters)):
        char_map[characters[i]] = i+1
    
    column_number = 0
    for j in range(0, len(column_title)):
        column_number = column_number * 26 + char_map[column_title[j]]
    
    return column_number

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given a positive integer, return its corresponding column title as it appears 
in an Excel sheet.
For example:
1 -> A
...
26 -> Z
27 -> AA
"""
def convert_to_title(num):
    integer_map = {}
    characters = "ZABCDEFGHIJKLMNOPQRSTUVWXY"
    for i in range(0, 26):
        integer_map[i] = characters[i]
    
    column_title = ""
    while num > 0:
        remainder = num % 26
        num -= 1
        num = num // 26
        column_title = integer_map[remainder] + column_title
    
    return column_title

#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given an array of integers, return all triplets that sum up to zero.
"""
def find_triplets_with_hash_table(lst):
    """
    This solution uses a hash table to cut the time complexity down by n.
    Time complexity: O(n^2) instead of O(n^3) in the naive solution
    Space complexity: O(n)
    
    Hint: a+b+c = 0 => c = -(a+b)
    Once we know the first two elements of the triplet, we can compute the third 
    and check its existence in a hash table. In order to only get unique triplets, 
    we first sort the array, and mark off elements in the hash table
    """
    if not lst or len(lst) < 3:
        print None
        
    numbers = {}
    for number in lst:
        numbers[number] = False
    #Boolean List
    
    for i in range(0, len(lst)-2):
        for j in range(i, len(lst)-1):
            first = lst[i]
            second = lst[j]
            third = -lst[i] - lst[j]
            if third in numbers and not numbers[third]:
                numbers[first] = True
                numbers[second] = True
                print [first, second, third]


#########################################
'''
MEDIUM MEDIUM MEDIUM MEDIUM MEDIUM
'''
#########################################
"""
Given a "pattern" and a string "str", find if "str" follows the same pattern.
Examples:
1. pattern = "abba", str = "dog cat cat dog" should return true.
"""
def word_pattern(pattern, str):
    pattern_str = {}
    str_pattern = {}
    pattern_lst = list(pattern)
    str_lst = str.split()
    
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

"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Given an array "nums", write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].
Note:
1. You must do this in-place without making a copy of the array
2. Minimize the total number of operations
"""
def move_zeros(num):
    trailing_idx= 0
    leading_idx = 1
    num_len = len(num)
    while leading_idx < num_len:
        if num[trailing_idx] == 0:
            if num[leading_idx] != 0:
                num[leading_idx], num[trailing_idx] = num[trailing_idx], num[leading_idx]
                trailing_idx = trailing_idx + 1
                leading_idx = leading_idx + 1
            else:
                leading_idx = leading_idx + 1
        else:
            trailing_idx = trailing_idx + 1
            leading_idx = leading_idx + 1
    
    return num
#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Implement an algorithm to determine if an algorithm contains all unique
characters while using no Data Structures.
"""
def unique_characters_no_ds(my_string):
    """
    Implementing a solution to this problem without an additional data structure
    requires using bit manipulation
    """
    checker = 0
    for character in my_string:
        char_code = ord(character) - ord('a')
        one_left_shift = 1 << char_code
        if checker & one_left_shift > 0:
            return False
        checker = checker | one_left_shift

    return True

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Given an array of integers, return all triplets that sum up to zero.
"""
def find_triplets(lst):
    """
    This solution achieves O(n^2) time complexity with no extra space requirements
    """ 
    if not lst or len(lst) < 3:
        print None
    
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

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Given two binary strings, return their sum (also as a binary string).
For example,
a = "11"
b = "1"
Return "100".
"""
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

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Compare two version numbers "version1" and "version2".capitalize
If "version1" > "version2" return 1, if "version1" < "version2" return -1, 
otherwise return 0.
"""
def compare_version(version1, version2):
    version1seq = version1.split(".")
    version2seq = version2.split(".")
    
    version1length = len(version1seq)
    version2length = len(version2seq)
    
    i = 0
    j = 0
    while i < version1length and j < version2length:
        if int(version1seq[i]) < int(version2seq[j]):
            return -1
        elif int(version1seq[i]) > int(version2seq[j]):
            return 1
            
        i = i + 1
        j = j + 1
    
    while i < version1length:
        if int(version1seq[i]) > 0:
            return 1       
        i = i + 1
        
    while j < version2length:
        if int(version2seq[j]) > 0:
            return -1
        j = j + 1
    
    return 0


#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Write a routine to convert a signed integer into a string.
"""
def integer_to_string(integer):
    if integer < 0:
        is_negative = True
        integer = -integer
    else:
        is_negative = False

    integer_string = ""
    while integer != 0:
        new_digit = integer % 10
        ascii_code = ord('0') + new_digit
        integer_string = integer_string + chr(ascii_code)
        integer = integer // 10

    # in python, the easiest way to reverse a string is "string[::-1]"\
    if is_negative:
    	integer_string = '-' + integer_string[::-1]
    else:
    	integer_string[::-1]
    
    return integer_string

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Given a roman numeral, convert it to an Integer
Input is guaranteed to be within the range from 1 to 3999.
"""
def roman_to_integer(roman_string):
    alphabet = {'I': 1,
                'V': 5,
                'X': 10,
                'L': 50,
                'C': 100,
                'D': 500,
                'M': 1000}
        
    previous = None
    value = 0
    for i in range(len(roman_string)-1, -1, -1):
        if previous and alphabet[roman_string[i]] < previous:
            value = value - alphabet[roman_string[i]]
        else:
            value = value + alphabet[roman_string[i]]
        previous = alphabet[roman_string[i]]
    
    return value

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Rotate an array of n elements to the right by k steps.
"""
def rotate(nums, k):
    # reverse 0..k-1, reverse k..n, then reverse 0..n
    n = len(nums)
    k = k % n # it is possible for k > n, k is number of steps
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start = start + 1
            end = end - 1
        
    reverse(0, n-k-1)
    reverse(n-k, n-1)
    reverse(0, n-1)
    
    return nums

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
def string_to_integer1(string):
    if string == '':
        return None

    is_negative = False
    start = 0
    if string[0] == '-':
        is_negative = True
        start = 1

    integer_value = 0
    for index in range(start, len(string)):
        character_int = ord(string[index]) - ord('0')
        integer_value = integer_value * 10 + character_int
        #Above statement is key, adding each integer_value * 10 and character int and saving as next integer value to get digits in the right place. Try 234.

    if is_negative:
        integer_value = -integer_value

    return integer_value

#########################################
'''
HARD HARD HARD HARD HARD HARD HARD HARD
'''
#########################################
"""
Given a mapping of numbers to letters on a telephone keypad, write a function that 
takes a seven-digit telephone number and prints out all the possible "words" or 
combinations of letters that can represent the given number. The 0 and 1 
keys do not map to any letters, so you should change only the digits 2-9 to letters.
"""
key_strings = {'2': 'abc',
               '3': 'def',
               '4': 'ghi',
               '5': 'jkl',
               '6': 'mno',
               '7': 'prs',
               '8': 'tuv',
               '9': 'wxy'}

def get_char_key(key, place):
    is_one = key == '1';
    is_zero = key == '0';
    if is_one:
        return '1'
    elif is_zero:
        return '0'
    else:
        return key_strings[key][place-1]

def translate_number(phone_number):
    phone_number_length = len(phone_number)
    translation = []

    for i in range(0, phone_number_length):
        translation.append(get_char_key(phone_number[i], 1))
        #Get first letter of T9 for each number

    while 1:
        # infinite loop that breaks when all the numbers are at their "high" value
        print (''.join(translation))
        #Going through phone number from the last digit
        for i in range(phone_number_length-1, -2, -1):
            if i == -1:
                # once it goes past the leftmost digit, we are done
                return

            is_one = phone_number[i] == '1'
            is_zero = phone_number[i] == '0'
            is_high = get_char_key(phone_number[i], 3) == translation[i]
            is_low = get_char_key(phone_number[i], 1) == translation[i]
            is_medium = get_char_key(phone_number[i], 2) == translation[i]
            if is_high or is_one or is_zero:
                translation[i] = get_char_key(phone_number[i], 1)
                #no break, continue to left neighbor
            elif is_low:
                translation[i] = get_char_key(phone_number[i], 2)
                break
            elif is_medium:
                translation[i] = get_char_key(phone_number[i], 3)
                break


#########################################