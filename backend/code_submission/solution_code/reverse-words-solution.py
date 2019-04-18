
def reverse_words2(string):
    string = string[::-1]
    string_list = string.split()
    word_count = len(string_list)
    for word_index in range(0, word_count):
        word = string_list[word_index]
        reversed_word = word[::-1]
        string_list[word_index] = reversed_word

    return ' '.join(string_list)
