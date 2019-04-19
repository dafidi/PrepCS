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
