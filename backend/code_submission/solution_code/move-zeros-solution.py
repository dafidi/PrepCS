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
