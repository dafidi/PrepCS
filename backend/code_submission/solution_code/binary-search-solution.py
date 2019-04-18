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
