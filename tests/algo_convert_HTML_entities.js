function convertHTML(str) {
  let pair = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '\"': '&quot;',
    '\'': '&apos;'
  };
  // &colon;&rpar;
  let newArr = [];
  newArr = str.split("").map( char => (Object.keys(pair).includes(char))? pair[char]: char);
  console.log(newArr);
  console.log(Object.keys(pair));
  console.log(Object.keys(pair).includes('&'));
  console.log(pair['&']);
  return newArr.join("");
}

convertHTML('Stuff in "quotation marks"');