"""
===================================================================================
                                      EASY
===================================================================================
"""
#########################################
class LinkedListNode:
    def __init__(self, data = None, next = None):
        self.data = data
        self.next = next
    def __str__(self):
        while self:
            print(self.data, "", end="")
            self = self.next
        return ""

#########################################
"""
Implement an algorithm to delete a node in the middle of a singly linked list,
given only access to that node
"""
def delete_middle(middle_node):
    """
    Since you are not given access to the head of the list, you can simply
    copy the data from the next node to the current node and then delete the
    next node.
    This solution does not work if the node to be deleted is the last node.
    """
    middle_node.data = middle_node.next.data
    middle_node.next = middle_node.next.next

#########################################
"""
Write a function to delete a node (except the tail) in a singly linked list,
given only access to that node.
Suppose the linked list is 1 -> 2 -> 3 -> 4 and you are given the third node 
with value 3, the linked list should become 1 -> 2 -> 4 after calling your function.
"""
def delete_node(node):
    if node and node.next: #node != None and node.next != None
        node.data = node.next.data
        node.next = node.next.next

"""
===================================================================================
                                     MEDIUM
===================================================================================
"""
#########################################
##### Merge two sorted Linked Lists
def MergeLists(Node list1, Node list2):
    if not list1:
        return list2
    if not list2:
        return list1
  if (list1.data < list2.data):
    list1.next = MergeLists(list1.next, list2);
    return list1
  else:
    list2.next = MergeLists(list1, list2.next);
    return list2


#########################################
"""
Remove all elements from a linked list of integers that have value "val".
Example:
Given: 1->2->6->3->4->5->6, val = 6
Return: 1->2->3->4->5
"""
def remove_elements(head, val):
    #beginning
    while head != None and head.data == val:
        head = head.next
        
    if head == None:
        return head
    
    current_node = head
    while current_node != None:
        while current_node.next != None and current_node.next.data == val:
            current_node.next = current_node.next.next
        
        current_node = current_node.next
    
    return head

#########################################
"""
Given a sorted linked list, delete all duplicates such that each element appears 
only once.
For example,
Given 1->1->2, return 1->2.
Given 1->1->2->3->, return 1->2->3.
"""
head = LinkedListNode(1);
head.next = LinkedListNode(1);
head.next.next = LinkedListNode(2);

def remove_duplicates(head):
    if head == None or not head.next: #You can either == to None or right not
        return head
    
    p = head
    while p.next: #While p.next != None
        if p.data == p.next.data:
            p.next = p.next.next
        else:
            p = p.next
    
    return head

#########################################
"""
Write a program that reverses a linked list without using more than O(1) storage
"""
def reverse_list(head):
    reverse = None
    while head: #Full reverse
        head.next, head, reverse = reverse, head.next, head
    return reverse

def reverse_list(head): #Remmeber zig zag
    new_head = None  # this is where we build the reversed list (reusing the existing nodes)
    while head:
        temp = head  # temp is a reference to a node we're moving from one list to the other
        head = temp.next  # the first two assignments pop the node off the front of the list
        temp.next = new_head  # the next two make it the new head of the reversed list
        new_head = temp
    return new_head

def reverse_list_nondestructive(head):
    new_head = None
    while head:
        new_head = LinkedListNode(head.data, new_head)
        head = head.next
    return new_head


###################################
"""
Write code to remove duplicates from an unsorted linked list
"""
def delete_duplicates(linked_list_node):
    """
    Using a hash table to keep track of nodes already found
    Time complexity is O(n)
    Space complexity is O(n)
    """
    if linked_list_node == None:
        return

    current_node = linked_list_node
    already_found = {}
    previous_node = None
    while current_node != None:
        if current_node.data in already_found:
            previous_node.next = current_node.next
        else:
            already_found[current_node.data] = 1
            previous_node = current_node
        current_node = current_node.next

    return linked_list_node

#########################################
"""
Given a linked list, remove the nth node from the end of the list and return 
its head.
For example,
Given the linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 
1->2->3->5.
"""
def remove_nth_from_end(head, n):
    n_behind_node = head
    faster_node = head
    before_behind_node = head
    
    for i in range(0, n):
        faster_node = faster_node.next
    
    while faster_node: #Pointers transvversing with difference. You'll understand.
        faster_node = faster_node.next
        before_behind_node = n_behind_node
        n_behind_node = n_behind_node.next
    
    if before_behind_node == n_behind_node: #While loop didn't run
        if not n_behind_node.next: #If only one node and removing it
            head = None
        else:
            head = n_behind_node.next #If head is node being removed
    else:
        before_behind_node.next = before_behind_node.next.next #Normal Scenario
    
    return head

"""
===================================================================================
                                      HARD
===================================================================================
"""
#########################################
"""
Implement a function to check if a linked list is a palindrome
"""
def isPalindrome(head):
    reverse = None
    fast = head
    #Reverse first half part of list
    while fast!= None and fast.next != None: #Half reverse
        fast = fast.next.next
        head.next, head, reverse = reverse, head.next, head

    #If the number of nodes is odd set the head of the tail list to the next of the median node
    if fast != None:
        tail = head.next
    else:
        tail = head

    #Compare the reverse first half list with the second half list
    #And restore the reverse first half list
    is_palindrome = True
    while reverse != None:
        if reverse.data != tail.data:
            is_palindrome = False
        reverse.next, reverse, head = head, reverse.next, reverse
        tail = tail.next

    return is_palindrome

# p = LinkedListNode(1)
# p.next = LinkedListNode(2)
# p.next.next = LinkedListNode(2)
# p.next.next.next = LinkedListNode(3)

# print(isPalindrome(p))

#########################################
"""
You have two numbers represented by a linked list, where each node contains
a single digit. The digits are stored in reverse order, such that the 1's
digit is at the head of the list. Write a function that adds the two numbers
and returns the sum as a linked list.
Suppose the digits are stored in forward order. Repeat the above problem.
"""
def linked_list_add(first_linked_list, second_linked_list, carry):
    """
    The numbers are stored in reverse order
    """
    if not first_linked_list and not second_linked_list and carry == 0:
        return None

    value = carry
    if first_linked_list:
        value = value + first_linked_list.data

    if second_linked_list:
        value = value + second_linked_list.data

    result = value % 10 # the last digit
    result_linked_list = LinkedListNode(result)

    if first_linked_list or second_linked_list:

        next_node = linked_list_add(None if not first_linked_list else first_linked_list.next,
                                    None if not second_linked_list else second_linked_list.next,
                                    0 if value < 10 else 1)

        result_linked_list.next = next_node

    return result_linked_list
#########################################
"""
You have two numbers represented by a linked list, where each node contains
a single digit. The digits are stored in reverse order, such that the 1's
digit is at the head of the list. Write a function that adds the two numbers
and returns the sum as a linked list.
Suppose the digits are stored in forward order. Repeat the above problem.
"""
def linked_list_add_forward(linked_list_one, linked_list_two, carry):
    # convert the first list to an integer
    current_node = linked_list_one
    first_integer_value = 0
    while current_node:
        first_integer_value = first_integer_value * 10 + current_node.data
        current_node = current_node.next
    # convert the second list to an integer
    current_node = linked_list_two
    second_integer_value = 0
    while current_node:
        second_integer_value = second_integer_value * 10 + current_node.data
        current_node = current_node.next

    result = first_integer_value + second_integer_value

    # convert result back to a linked list
    divided_by_ten = result
    next_node = None
    while divided_by_ten != 0:
        current_digit = divided_by_ten % 10
        divided_by_ten = divided_by_ten // 10
        new_node = LinkedListNode(current_digit)
        new_node.next = next_node
        next_node = new_node

    return new_node


#########################################
