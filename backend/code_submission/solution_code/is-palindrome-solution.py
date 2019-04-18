
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
