var express = require('express');
var app = express();
var db = require('./db/models.js');
var path = require('path');

app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.urlencoded({extended: false}));

app.post('/author', (req, res) => {
  console.log('req.body', req.body)
  var bookId = req.body.bookId;
  // res.send('Allen C. Guelzo, 43, Allen Carl Guelzo (born 1953) is the Henry R. Luce III Professor of the Civil War Era at Gettysburg College, where he serves as Director of the Civil War Era Studies Program.')
  db.getAuthorInfo(bookId, (err, results) => {
    if (err) { throw err; }
    console.log('results', results);
  })
});

app.get('/five-books-by-author', (req, res) => {
  res.send('Lincoln and Douglas: The Debates That Defined America, The History of the United States, Abraham Lincoln: Redeemer President, Fateful Lightning: A New History of the Civil War and Reconstruction, Lincolns Emancipation Proclamation: The End of Slavery in America')
});

app.get('/book-item-hover-window', (req, res) => {
  res.send('Lincoln and Douglas: The Debates That Defined America, Allen C. Guelzo, 3.96, 321, 2008, In 1858, Abraham Lincoln was known as a successful Illinois lawyer who had achieved some prominence in state politics as a leader in the new Republican Party. Two years later, he was elected president and was on his way to becoming the greatest chief executive in American history. What carried this one-term congressman from obscurity to fame was the campaign he mounted for the United States Senate against the countrys most formidable politician, Stephen A. Douglas, in the summer and fall of 1858. Lincoln challenged Douglas directly in one of his greatest speeches -- "A house divided against itself cannot stand" -- and confronted Douglas on the questions of slavery and the inviolability of the Union in seven fierce debates. As this brilliant narrative by the prize-winning Lincoln scholar Allen Guelzo dramatizes, Lincoln would emerge a predominant national figure, the leader of his party, the man who would bear the burden of the national confrontation. Of course, the great issue between Lincoln and Douglas was slavery. Douglas was the champion of "popular sovereignty," of letting states and territories decide for themselves whether to legalize slavery. Lincoln drew a moral line, arguing that slavery was a violation both of natural law and of the principles expressed in the Declaration of Independence. No majority could ever make slavery right, he argued. Lincoln lost that Senate race to Douglas, though he came close to toppling the "Little Giant," whom almost everyone thought was unbeatable. Guelzos Lincoln and Douglas brings alive their debates and this whole year of campaigns and underscores their centrality in the greatest conflict in American history. The encounters between Lincoln and Douglas engage a key question in American political life: What is the purpose of democracy? Is it to satisfy the desires of the majority? Or is it to achieve a just and moral public order? These were the real questions in 1858 that led to the Civil War. They remain questions for Americans today.')
});

app.listen(3002, () => {
  console.log('listeing at 3002')
})