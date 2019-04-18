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
