function telephoneCheck(str) {
  // with parenthises and spaces  1 (555) 555 5555 or 1 (555) 555-5555
  let regex0 = /\d{3}/;
  console.log("test", regex0.test("2 555"));
  let regex1 = /^[1]\s?\(\d{3}\)\s?\d{3}[\s|-]?\d{4}$/;
  // without parenthises and hyphens  1 555 555-5555 
  let regex2 = /^[1]\s\d{3}[\s|-]?\d{3}[\s|-]?\d{4}$/;
  let regex3 = /^\(\d{3}\)\s?\d{3}[\s|-]?\d{4}$/;
  let regex4 = /^\d{3}[\s|-]?\d{3}[\s|-]?\d{4}$/;
  // Good luck!
  if (regex1.test(str)){
    console.log("test1")
    return true;
  } else if (regex2.test(str)){
    console.log("test2")
    return true;
  } else if (regex3.test(str)){
    console.log("test3")
    return true;
  } else if (regex4.test(str)){
    console.log("test4")
    return true;
  }


  return false;
}

//telephoneCheck("555-555-5555");
console.log(telephoneCheck("2 (757) 622-7382")) ;