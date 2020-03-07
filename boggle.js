function Trie() {
    //Trie instance has a child and leaf
    this.child = null;
    this.leaf = false;
    //Ascii value of A is 65.
    //Do not modify object unnecessarily. Save it in a variable and then change it.
    this.contains = function (s) {
        var currentNode = this;
        for (var i=0; i<s.length; i++){
            var ind = s.charCodeAt(i)-65;
            if(currentNode.child && currentNode.child[ind])
                currentNode = currentNode.children[ind];
            else
                return false; 
        }
        return currentNode.leaf;
    }
    
    this.has = function(c) {
        if(this.child)
            return this.child[c.charCodeAt()-65]!=undefined;
        return false;
    }
    
    this.next = function(c) {
        if(this.child)
            return this.child[c.charCodeAt()-65];
        else
            return undefined;
    }
    
    this.insert = function(s) {
        var currentNode = this;
        for(var i=0; i<s.length; i++){
            var ind = s.charCodeAt(i)-65;
            if(currentNode.child == null){
                currentNode.child = new Array(26);
                currentNode.child[ind] = new Trie();
                currentNode = currentNode.child[ind];
            }
            else if(currentNode.child[ind])
                currentNode = currentNode.child[ind];
            else{
                currentNode.child[ind] = new Trie();
                currentNode = currentNode.child[ind];
            }
        }
        currentNode.leaf=true;
        return currentNode;
    }
}

function Board(rows,columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = new Array(rows);
    for(var i=0; i<rows; i++){
        this.board[i] = new Array(columns);
        for(var j=0; j<columns; j++)
            this.board[i][j]='';
    }
    
    this.getchar = function(row,column) {
        return this.board[row][column];
    }
    
    this.setchar = function(row,column,x) {
        if(x!=undefined)
            this.board[row][column] = x;
    } 
    
    this.numRows = function() {
        return this.rows;
    }
    
    this.numColumns = function() {
        return this.columns;
    }
}

var displayBoard = function (rows, columns, div) {
    var board = new Board(rows,columns);
    var count = 0;
    for(var i=0;i<rows;i++){
        var r = $('<div class="row"></div>');
        for(var j=0;j<columns;j++){
            var c = $('<input type="text" id="cell'+(count+1)+'" class="cell" maxlength="1" data-row="' + i + '" ' + 'data-column="' + j + '" ' + '/>');
            r.append(c);
        }
        div.append(r);
    }
    
    var onCellChange = function () {
        var row = $(this).data('row');
        var column = $(this).data('column');
        board.setchar(row,column,$(this).val().toLowerCase()); 
    }
    
    $('.cell').change(onCellChange);
    return board;
}

var solution = function (boggle,trie) {
    var rows = boggle.numRows();
    var columns = boggle.numColumns();
    var charStack = new Array();
    var words = new Array();
    
    var findwords = function (row,column,trieNode) {
        if(visited[row][column]) return;
        if(!trieNode || !trieNode.has(boggle.getchar(row,column)))
            return;
        trieNode = trieNode.next(boggle.getchar(row,column));
        charStack.push(boggle.getchar(row,column));
        
        visited[row][column] = true;
        
        for(var x=-1;x<=1;x++){
            var c = column +x;
            if(c<0 || c>= columns) continue;
            for(var y=-1;y<=1;y++){
                var r = row + y;
                if(r<0 || r>=rows) continue;
                if(x==0 && y==0) continue;
                findwords(r,c,trieNode);
            }
        }
        if(trieNode.leaf){
            var str="";
            for(var i=0;i<charStack.length;i++)
                str=str+charStack[i];
            words.push(str);
        }
        visited[row][column] = false;
        charStack.pop();
    };
    
    var visited=new Array(rows);
    for(var i=0;i<rows;i++){
        visited[i]=new Array(columns);
        for(var j=0;j<columns;j++)
            visited[i][j]=false;
    }
    
    for(i=0; i<rows; i++)
        for(j=0; j<columns; j++)
            findwords(i,j,trie);
    return words;
}

var board,dict=new Trie();

var boardDimChanged = function () {
    $('#boggle_board').empty();
    var rows = $('#rows').val();
    var columns = $('#columns').val();
    board = displayBoard(rows,columns,$('#boggle_board'));
}
$('#rows , #columns').click(boardDimChanged).change(boardDimChanged);

$("#boggle_input,#boggle_output").hide();
$("#loading").show();
$.getJSON('dictonary.json',function( data ) {
    for(var key in data){
      dict.insert(key);
  }
    $("#boggle_input").show();
    $("#loading").hide();
});

$('#submit').click(function(){
    $('#output').empty();
    var rows = $('#rows').val();
    var columns = $('#columns').val();
    var count=0;
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            if($('#cell'+count).val()=="")
                return;
            count++;
        }
    }
    
    var words = solution(board,dict);
     words = words.filter(function (item, idx, arr){
    return idx == arr.indexOf(item);
  });
    for (i = 0; i < words.length; i++){    
        $('#output').append(words[i]+' , ');
    }
    $("#boggle_output").show();
})