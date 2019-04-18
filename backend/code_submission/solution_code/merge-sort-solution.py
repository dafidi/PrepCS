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
