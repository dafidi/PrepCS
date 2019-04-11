"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
"""
Write a method to count the number of 2s between 0 and n
"""
# brute force solution
def number_of_twos(number):
    count = 0
    for i in range(2, number+1):
        count = count + get_number_of_twos(i)
    
    return count

def get_number_of_twos(number):
    count = 0
    while number > 0:
        if number % 10 == 2:
            count = count + 1
        number = number // 10
    
    return count

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
########################################
"""
Write a method to shuffle a deck of cards. It must be a perfect shuffle -
in other words, each of the 52! permutations of the deck has to be equally
likely. Assume you are given a random number generator which is perfect.
"""
import random

card_deck = []
for i in range(0, 52):
    card_deck.append(i)

def shuffle():
    """
    move through the array and for each element i, swap array[i]
    with a random element between 0 and i, inclusive
    """
    for i in range(1, len(card_deck)):
        to_be_swapped = random.randint(0, i)
        card_deck[i], card_deck[to_be_swapped] = card_deck[to_be_swapped], card_deck[i]

    return card_deck
#########################################
"""
Write an algorithm which computes the number of trailing zeros in n factorial.
"""
def count_trailing_zeros(n):
    """
    Each 5-multiple in the factorial (1x2x...xn) contributes a trailing zero
    5-multiples are 5, 25, 125, etc.
    """  
    count = 0
    if n < 0:
        return -1 # error
    
    multiple = 5
    while n // multiple > 0:
        count = count + n // multiple
        multiple = multiple * 5
    
    return count


#
"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
"""
Write a method to randomly generate a set of n integers from an array of size 
n. Each element must have equal probability of being chosen.
"""
import random

def pick_elements(original_list, number_of_elements):
    subset = original_list[:number_of_elements]
    for i in range(number_of_elements, len(original_list)):
        random_number = random.randint(0, i)
        print random_number
        if random_number < number_of_elements:
            subset[random_number] = original_list[i]
        
    return subset

#########################################
"""
Write a method to return all subsets of a set
"""
def get_all_subsets(original_set):
    
    # iterative solution - O(2^n) where n is the size of the original set
    
    all_subsets = [[]]
    for element in original_set:
        subsets = []
        for subset_element in all_subsets:
            new_subset = []
            new_subset.extend(subset_element)
            new_subset.append(element)
            subsets.append(new_subset)
        all_subsets.extend(subsets)
    
    return all_subsets


#########################################