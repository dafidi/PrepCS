def is_power_of_three(number):
    while number >= 3:
        number = number / 3.0

    return number % 1 == 0