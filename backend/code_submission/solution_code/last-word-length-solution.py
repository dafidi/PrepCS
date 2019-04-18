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
