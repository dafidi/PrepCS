"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
'''
Linear Search
'''
def Linear_Search(myItem, myList):
	found = False
	position = 0
	while position < len(myList):
		if myList[position] == myItem:
			found = True
			break
		position += 1
	return found
#########################################
'''
Bubble Sort
'''
#Optimized for swaps
def Bubble_Sort(myList):
	moreSwaps = True
	while moreSwaps:
		moreSwaps = False
		for element in range(len(myList)-1):
			if myList[element] > myList[element + 1]:
				moreSwaps = True
				myList[element], myList[element + 1] = myList[element + 1], myList[element]
	return myList
	
"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
'''
Binary Search
'''
def Binary_Search(myItem, myList): #For Binary Search, list needs to be in order.
	found = False
	bottom = 0
	top = len(myList) - 1
	while bottom <= top:
		middle = (bottom + top) // 2
		if myList[middle] == myItem:
			found = True
			break
		elif myList[middle] < myItem:
			bottom = middle + 1
		else:
			top = middle - 1
	return found
#########################################
#########################################
'''
Insertion Sort
'''
def Insertion_Sort(myList):
	for i in range(1, len(myList)):
		j = i
		while j > 0 and myList[j] < myList[j-1]:
			myList[j], myList[j-1] = myList[j-1], myList[j]
			j -= 1
	return myList

#########################################
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
        
"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
'''
Merge Sort
'''
def Merge_Sort(myList):
	if len(myList) < 2:
		return myList
	result = []
	middle = len(myList) // 2
	myListleft = Merge_Sort(myList[:middle])
	myListright = Merge_Sort(myList[middle:])
	while(len(myListleft) > 0) and (len(myListright) > 0):
		if myListleft[0] > myListright[0]:
			result.append(myListright[0])
			myListright.pop(0)
		else:
			result.append(myListleft[0])
			myListleft.pop(0)
	result += myListleft
	result += myListright
	return result
