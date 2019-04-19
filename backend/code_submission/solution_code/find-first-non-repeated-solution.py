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