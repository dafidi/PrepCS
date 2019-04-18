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
        return addDigits(sum)
