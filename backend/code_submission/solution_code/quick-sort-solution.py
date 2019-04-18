'''
Quick Sort
'''
def sort(myList):
    less = []
    equal = []
    greater = []
    if len(myList) > 1:
        pivot = myList[0]
        for x in myList:
            if x < pivot:
                less.append(x)
            if x == pivot:
                equal.append(x)
            if x > pivot:
                greater.append(x)
        return sort(less)+equal+sort(greater)
    else:
        return myList
