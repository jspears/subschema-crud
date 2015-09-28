var context = require.context('./client', true, /-test\.js(x)?$/); //make sure you have your directory and regex test set correctly!
console.log(context.keys());
context.keys().forEach(context);
