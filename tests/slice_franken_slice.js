<!DOCTYPE html>
<html lang="en"> 

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 </head>
<body>

<script type="text/javascript">



function frankenSplice(arr1, arr2, n) {
  let newAr2 = arr2.splice();
  let newArr2Front = newArr2.slice(0,n);
  let newArr2End = newArr2.slice(n,arr1.length);
  console.log(newArr2Front);
  console.log(newArr2End);

  for (let i = 0; i < arr1.length; i++) {
    newArr2Front.push(arr1[i]);
  }
  newArr2 = newArr2Front + newArr2End
  console.log(newArr2);
  return newArr2;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);



</script>

</body>
</html>