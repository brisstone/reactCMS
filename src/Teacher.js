import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { getUser, removeUserSession } from './Utils/Common';
import axios from 'axios';


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import 'draft-js/dist/Draft.css';
import '../node_modules/draft-js/dist/Draft.css'

import './index.css'
import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256"); 




export default function Teacher(props) {
  const user = getUser();


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [password, setPassword] = useState('')
 
  // determines if a file has been picked or not
  const [isSelected, setIsSelected] = useState(false);
  const [majorfieldvalue, setMajorfieldvalue] = useState('Science');
  const [minorfieldvalue, setMinorfieldvalue] = useState('');
  const [courseList, setCourseList] = useState([])
  const [extraCourseList, setExtraCourseList] = useState([])
  const [errorType, setErrorType] = useState(true)
  
  
  
  const [startYear, setStartYear] = useState(null);
 
  const [checkBox, setcheckBox] = useState(true)
  
  


  var remove = false;
  const html = '<p id="para">asdfsd</p>';
  

  

  const Science = ["Biology", "Physics", "Chemistry"]
  const Commercial = ["Account", "Business", "Credit"]
  const Art = ["Law", "Poet", "Singer"]


const Biology = ["Biology1", "Biology2", "Biology3"]
const Physics = ["Physics1", "Physics2", "Physics3"]
const Chemistry = ["Chemistry1", "Chemistry2", "Chemistry3"]
const Account = ["Account1", "Account2", "Account3"]
const Business = ["Business1", "Business2", "Business3"]
const Credit = ["Credit1", "Credit2", "Credit3"]
const Law = ["Law1", "Law2", "Law3"]
const Poet = ["Poet1", "Poet2", "Poet3"]
const Singer = ["Singer1", "Singer2", "Singer3"]

//   const [checkedState, setCheckedState] = useState(
//     new Array(toppings.length).fill(false)
// );

const allCourses = ["Biology1", "Biology2", "Biology3", "Physics1", "Physics2", "Physics3", "Chemistry1", "Chemistry2", "Chemistry3", "Account1", 
                  "Account2", "Account3", "Business1", "Business2", "Business3", "Credit1", "Credit2", "Credit3", "Law1", "Law2", "Law3", "Poet1", 
                  "Poet2", "Poet3", "Singer1", "Singer2", "Singer3" ]




  /** Type variable to store different array for different dropdown */
  let type = null;
  let type2 = null;
  
  /** This will be used to create set of options that user will see */
  let options = null;
  let checkboxes = true;
  
  /** Setting Type variable according to dropdown */
  if (majorfieldvalue === "Science") {
    type = Science;
  } else if (majorfieldvalue === "Commercial") {
    type = Commercial;
  } else if (majorfieldvalue === "Art") {
    type = Art;
  }
  // set type variables for sub minor dropdown
  if (minorfieldvalue === "Biology") {
    type2 = Biology;
  } else if (minorfieldvalue === "Physics") {
    type2 = Physics;
  } else if (minorfieldvalue === "Chemistry") {
    type2 = Chemistry;
  }else if (minorfieldvalue === "Account") {
    type2 = Account;
  } else if (minorfieldvalue === "Business") {
    type2 = Business;
  }else if (minorfieldvalue === "Credit") {
    type2 = Credit;
  } else if (minorfieldvalue === "Law") {
    type2 = Law;
  }else if (minorfieldvalue === "Poet") {
    type2 = Poet;
  } else if (minorfieldvalue === "Singer") {
    type2 = Singer;
  }

  

  
  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  
  
// const newallCourses = type2.forEach((e)=>{
//   allCourses.filter(course => course !== e)
// })

 
  // console.log(type2)
  console.log(newallCourses)




    

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

 

  function majorFieldChangeHandler(event){
    setMajorfieldvalue(event.target.value)
    console.log(majorfieldvalue)
    console.log(event.target)
  }

 

 
  const handleFullnameOnChange = (e)=>{
    var value = e.target.value
    setFullname(value) 
  }

  const handlePasswordOnChange = (e)=>{
    var value = e.target.value
    // Encrypt

    // var ciphertext = Base64.stringify(CryptoJS.AES.encrypt(value, 'secret key 123').toString());
    // const nonce = "jay"
    // const hashDigest = SHA256(value);
    // const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));


    setPassword(value) 
    console.log(password)
  }

  
  const handleEmailOnChange = (e)=>{
    var value = e.target.value
    setEmail(value) 
  }



  const handleDateofbirthOnChange = (e)=>{
    var value = e.target.value
    setDateOfBirth(value)
    
    // setCourseList(courseList => [...courseList,value] );
    
  }

  const handleStartyearOnChange = (e)=>{
    var value = e.target.value

    
    
    setStartYear(value.replace(/[^\d.]/ig, ""))

   
    // setCourseList(courseList => [...courseList,value] );
    
  }

  const handleMinorfieldOnChange = (e)=>{
    var value = e.target.value
    setMinorfieldvalue(value)
    // setCourseList(courseList => [...courseList,value] );
  }


 





  var newallCourses
  const allcoursesField = useCallback((e) => {
    console.log(type2)
    // if(type2){
    //    type2.map((e)=>{
    //   newallCourses = allCourses.filter(course => course !== e)
  
    //  })
    // }

    console.log(newallCourses)
      newallCourses = allCourses.filter(el=> !type2.includes(el))
  
  }
, [type2])


if(type2){
  allcoursesField()
}


   
const handleExtraCourseOnClick = useCallback((e) => {
  var value = e.target.value
  console.log(e.target.value)


    
    setExtraCourseList(extraCourseList => [...extraCourseList,value] );
   
 
}, [extraCourseList])


  console.log(extraCourseList)

const handleDeleteExtracourse = (e)=>{
  e.preventDefault()
  var value = e.target.value
  console.log(value)
  setExtraCourseList(extraCourseList.filter((a) => a !== value));

}

// const handleAddExtracourse = (e)=>{
//   e.preventDefault()
//   var value = e.target.value
//   console.log(value)
//   setExtraCourseList(extraCourseList => [...extraCourseList,value] );

// }



  const handleOnClick = useCallback((e,type2) => {
    var value = e.target.value
    // setcheckBox(false);
    // setCourseList(type2);
    console.log(type2)
    // type2.map(e=>{
    //   setCourseList(e);
    // })
    console.log(e.currentTarget)
    console.log(value)
    console.log(courseList)

    let NewCourses
    // e.target.checked = "false"
    if (e.target.checked){

       //append to array
       console.log("uppppp", e.target)
       setCourseList(courseList => [...courseList,value] );

      
      
     
    } else if(!e.target.checked) {
     
      //remove from array

      console.log("MEEE", e.target)
      console.log(typeof(value))

      NewCourses =  courseList.filter((a) => a !== value);
      setCourseList(NewCourses);
      

    
   }
  }, [courseList])


  console.log(courseList)

  const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

  const submitHandler = (e) =>{
      e.preventDefault();

      console.log(startYear.length)
     
      if(startYear.length < 4){
        setMessage("Start Year Length is less than 4")
      }else{

  

      axios.post('/admregister', {Adm: "", email: email, FullName: fullname,Password: password, DateOfBirth: dateOfBirth, SchoolStartYear: startYear, MajorFieldOfStudy: majorfieldvalue, MinorFieldOfStudy: minorfieldvalue, Courses: courseList, AdCourses: extraCourseList}).then(response => {
            setLoading(false);
            console.log(response)
            console.log(response.data[0].EmailAlreadyExist)
            // var reply = response.data;
            // var jsonData = JSON.parse(JSON.stringify(response));
            // console.log(jsonData)
            // console.log(typeof(jsonData.data))
            if(response.data[0].EmailAlreadyExist === "Email Already Exists"){
              setErrorType(false)
              setMessage("EMAIL ALREADY EXISTS")
            }else if(response.data[0].SUCCESS === "SUCCESS"){
              
              setErrorType(true)
              setMessage("SUCCESS")
            }else{
              setErrorType(false);
              setMessage("ERROR IN STORING")
            }
            
          
        }).catch(error => {
          setLoading(false);
          console.log(error);
          if (error.status === 401) setMessage(error.response.data.message);
          else setMessage("SOMETHING WENT WRONG");
          
        });

      }

           
  }
  
    useEffect(() => {
      console.log(majorfieldvalue)
      console.log(courseList)
    }, [majorfieldvalue])

  console.log(errorType)
  return (
    <div>
      {/* {user.name}! */}
      Welcome Teacher: {user} <br /><br />
      
      {console.log(user)}

      <input type="button" onClick={handleLogout} value="Logout" />

      <div className="errorMsg">
      {errorType? <div  className="successMsg" ><h3>{message}</h3></div> : <div className="failureMsg"><h3>{message}</h3></div>}
      </div>
      <div>
          Register Students
        </div>
      <form className="form" onSubmit={submitHandler} >
        

        <div className="input-container">
          <label className="parameter"> Email</label>
        <input type="email" placeholder="email" onChange={handleEmailOnChange} required  />
        </div>

        <div className="input-container">
          <label className="parameter"> Fullname</label>
        <input type="text" placeholder="full-name" onChange={handleFullnameOnChange} required />
        </div>

        <div>
        <label className="parameter">Password</label>
        <input type="password" placeholder="password" onChange={handlePasswordOnChange} required />
          
        </div>
        
        <div className="input-container">
          <label className="parameter" >Date of birth</label>
          <input type="date" id="birthday" name="birthday" onChange={handleDateofbirthOnChange} required/>
        </div>
        
     
        
        <div className="input-container">
          <label className="parameter" >School Start Year</label>
        <input maxLength="4" type="text" value={startYear} placeholder="School Start" onChange={handleStartyearOnChange} required/>
        </div>
        
        <div className="input-container">
          <label className="parameter">Major Field of Study</label>
          <select onChange={majorFieldChangeHandler} value={majorfieldvalue} required>
            {/* {console.log("fo", e)} */}
            <option value="Science" key="1">Science</option>
            <option value="Art" key="2">Art</option>
            <option value="Commercial" key="3">Commercial</option>
          </select>
        </div>

        <div className="input-container">
        <label className="parameter">Minor Field of Study</label>
          <select onChange={handleMinorfieldOnChange} value={minorfieldvalue} required>
              <option>select</option>
             {options}
          </select>
         
        </div>
        
        <div className="showCourses" >
            <div className="input-container" >
              <label className="parameter"> Course List</label>
              {
                type2? type2.map((el) => (
                  <div key={el}>
                    <label htmlFor={el} >{el}
                      
                      <input type="checkbox"  id="inline" name={el} value={el}   onChange={handleOnClick}/>
                    </label>
                    
                  </div>
                ) ) : <label>&nbsp;</label>
              }
            
            </div>

            <div>
            {/* <label>Other</label> */}
                    <div>
                      <label > Other Courses</label>
                    </div>

                    <select onChange={handleExtraCourseOnClick}>
                      <option value="" key="">Select</option>

                    {newallCourses? newallCourses.map(e =>(
                    <option value={e} key={e}>{e}</option>                              
                
                  )) : <div>&nbsp;</div>}
                        
              </select>
              <div className="extraCourselist">
              {extraCourseList.map(e=>(
                <div>{e}
                  <button className="deleteBtn" value={e} onClick={handleDeleteExtracourse}>Remove</button>
                  {/* <button value={e} onClick={handleAddExtracourse}>Add</button> */}
                </div>
              ))}
              </div>
            
            </div>
        
        </div> 

          <button className="primary" type="submit">
            Register
          </button>
        



      </form>
    </div>
  );
}
