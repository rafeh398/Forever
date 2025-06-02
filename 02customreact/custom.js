



const reactElement1= {
    type: "a",
    props :{
        href: "http://google.com",
        target:"-blank"                   //ye wala to hm js use kr k bnaty na
},
       children:"click me to visit google" 
}

constmainConatiner= document.querySelector("#root")

//phr hm inner html ye wo lga k dom element create krty
//react mein jsx file mein mix js likho

//lekin react mein element bnana hu to method ha or us mathod k jo paramter hain wo apne react k hisab se dene

const anotherElement = (
    <a href="https://google.com" target='_blank'>Visit google</a>
)

const reactElement = React.createElement(
    'a',  //1st paramter is tag
    {href: 'https://google.com',target: '_blank' }, //2nd parameter is object(properties)...
    // //setAttribute ha ye asal mein

    'click me to visit google',  //direct text ha 3rd matter
    anotherElement //4th parameter injecting the variable// evaluated expression//if else direct ni likh skty
)
 // render kr do iske bd jese main jsx mein hota


 //******************
 // 
 //  */

 