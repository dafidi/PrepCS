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
