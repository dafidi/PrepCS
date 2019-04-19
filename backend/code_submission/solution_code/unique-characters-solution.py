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
