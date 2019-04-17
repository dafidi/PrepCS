
def Linear_Search(myItem, myList):
	found = False
	position = 0
	while position < len(myList):
		if myList[position] == myItem:
			found = True
			break
		position += 1
	return found
