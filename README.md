# M.SrikarReddy CSE IIT Palakkad

* Boggle Solver

->Used bootstrap-4.4.1 and Jquery-3.4.1 in this project
->The dictonary of english words for checking are taken from https://github.com/dwyl/english-words/blob/71fd8028395eb61be17e47f70dde0ae6994d9b72/words_dictionary.json

->The dictonary is stored in Trie data structure
  It has the following for an instance of Trie:
  -> child attribute which is another trie(part of the original trie actually) or null if it doesn't have a child
  -> leaf which denotes whether a word can be formed from the root to the present node.
  -> contains function which checks if a string is present in the trie
  ->has function which checks if the node has a character c as its child 
  ->next function which points the present node to its child which has the character c
  ->insert function which inserts a string into the trie
  



** Instructions to follow **
-> Run the application
-> Wait untill the dictonary of words is inserted into trie datastructure
-> Give the dimensions of the boggle and press submit
-> Fill the boggle board with lower case alphabets and the press the submit button below it
-> You will get the output below which are the words that can be formed from the input boggle and also present in the english words of dictonary.