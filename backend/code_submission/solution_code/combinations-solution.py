class Combinations:
    def __init__(self, input_string):
        # constructor 
        self.input_string = input_string
        self.comb_string = ""
        self.do_combinations(0)

    def do_combinations(self, start):
        i = start;
        while i < len(self.input_string):
            self.comb_string = self.comb_string + self.input_string[i]
            print (self.comb_string)
            self.do_combinations(i+1)
            self.comb_string = self.comb_string[:-1]
            i = i + 1
def combinations_solutions(input_string, i, combined_string):
    while i < len(input_string):
        combined_string = combined_string + input_string[i]
        print (combined_string)
        combinations_solutions(input_string, i+1, combined_string)
        combined_string = combined_string[:-1] #Removes last letter
        i = i + 1
