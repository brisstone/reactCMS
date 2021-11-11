import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { getUser, removeUserSession } from './Utils/Common';
import axios from 'axios';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../node_modules/draft-js/dist/Draft.css'
// import '../src/richeditor.css'
import RichTextEditor from './components/Richtexteditor';
import './index.css'
import e from 'cors';



export default function Teacher(props) {
  const user = getUser();


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [fullname, setFullname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [selectedfile, setSelectedfile] = useState(null);
  const [majorfieldvalue, setMajorfieldvalue] = useState('');
  const [minorfieldvalue, setMinorfieldvalue] = useState('');
  const [courseList, setCourseList] = useState([])
  const [CourseListBkup, setCourseListBkup] = useState([])
  const [suspended, setSuspended] = useState(false);
  const [comment, setComment] = useState('');
  const [startYear, setStartYear] = useState(null);
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  const [BA, setBA] = useState("BA")
  const [BSc, setBSc] = useState("BSc")
  const [PHD, setPHD] = useState("PHD")
  const [degree, setDegree] = useState('')


  var remove = false;
  
  
  
  // const majorfield = ["Science", "Art", "Commercial"]

  const Science = ["Biology", "Physics", "Chemistry"]
  const Commercial = ["Account", "Business", "Credit"]
  const Art = ["Law", "Poet", "Singer"]

  // const Biology = [
  //                 { id: 1, subcourse: Anatomy}
  //                 { id: 1, subcourse: Anatomy}
  //                 { id: 1, subcourse: Anatomy}
  //   "Anatomy", "Health", "Body"]
  // const Physics = ["Physics1", "Physics2", "Physics3"]
  // const Chemistry = ["Chemistry1", "Chemistry2", "Chemistry3"]
  // const Account = ["Account1", "Account3", "Account3"]
  // const Business = ["Business1", "Business2", "Business3"]
  // const Credit = ["Credit1", "Credit2", "Credit3"]
  // const Law = ["Law1", "Law2", "Law3"]
  // const Poet = ["Poet1", "Poet2", "Poet3"]
  // const Singer = ["Singer1", "Singer2", "Singer3"]


    // const Health = [
    //   { id: 1, subcourse: "Anatomy"},
    //   { id: 2, subcourse: "Health1"},
    //   { id: 3, subcourse: "Body"},
    // ]
    // const Physics = [
    //   { id: 1, subcourse: "Physics1"},
    //   { id: 2, subcourse: "Physics2"},
    //   { id: 3, subcourse: "Physics3"},
    // ]
    // const Biology = [
    //   { id: 1, subcourse: "Biology1"},
    //   { id: 2, subcourse: "Biology2"},
    //   { id: 3, subcourse: "Biology3"},
    // ]

const Biology = ["Biology1", "Biology2", "Biology3"]
const Physics = ["Physics1", "Physics2", "Physics3"]
const Chemistry = ["Chemistry1", "Chemistry2", "Chemistry3"]
const Account = ["Account1", "Account3", "Account3"]
const Business = ["Business1", "Business2", "Business3"]
const Credit = ["Credit1", "Credit2", "Credit3"]
const Law = ["Law1", "Law2", "Law3"]
const Poet = ["Poet1", "Poet2", "Poet3"]
const Singer = ["Singer1", "Singer2", "Singer3"]

//   const [checkedState, setCheckedState] = useState(
//     new Array(toppings.length).fill(false)
// );

const allCourses = ["Biology1", "Biology2", "Biology3", "Physics1", "Physics2", "Physics3", "Chemistry1", "Chemistry2", "Chemistry3", "Account1", 
                  "Account3", "Account3", "Business1", "Business2", "Business3", "Credit1", "Credit2", "Credit3", "Law1", "Law2", "Law3", "Poet1", 
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

 
  console.log(type2)
  console.log(newallCourses)




    

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const fileSelectorHandler = (e) =>{
    console.log(e.target.files[0])
    setSelectedfile(e.target.files[0])
  }

  function majorFieldChangeHandler(event){
    setMajorfieldvalue(event.target.value)
    console.log(majorfieldvalue)
    console.log(event.target)
  }

  const handleSuspensionChange = () => {
    setSuspended(!suspended);
  };

  const handleCommentChange = (e)=>{
      setComment(e.target.value)
  }

  const handleOnChange = (e)=>{
    var value = e.target.value
    setFullname(value)
    setDateOfBirth(value)
    setStartYear(value)
    setMinorfieldvalue(value)
    // setCourseList(courseList => [...courseList,value] );
    
    
  }

  const handleRadioOnChange = (e)=>{
      var value = e.target.value;
     setDegree(value);
  }
  console.log(degree)


  var newallCourses
  const allcoursesField = useCallback((e) => {
    console.log()
    if(type2){
       type2.forEach((e)=>{
      newallCourses = allCourses.filter(course => course !== e)
      console.log(newallCourses)
     })
    }
  
  }
, [allCourses])


if(type2){
  allcoursesField()
}

  
  const handleOnClick = useCallback((e) => {
    
    console.log(e.target.checked)
    var value = e.target.value
    let NewCourses
    const name = e.target.getAttribute("name")
    console.log(name)

    var array = [...courseList]; 
    var index = courseList.indexOf(e.target.value)
    
    if (e.target.checked){
      //append to array
      

      setCourseList(courseList => [...courseList,value] );
      // setCourseList.concat([value])
      // this.setState({
      //   keyGen: this.state.keyGen.concat([value])
      // })
    } else if(!e.target.checked) {
      //remove from array

      console.log("MEEE", e.target)
      console.log(typeof(value))

      NewCourses =  courseList.filter((a) => a !== value);
      setCourseList(NewCourses);

      // const selectedCourse =  courseList.filter(a => {
      //   return a  !== value
      //   // if (i === Number(e.target.value)) return false;
      //   // return true;
      // });
      // setCourseList([...selectedCourse]);

      // setCourseList(courseList.filter((course, i) =>{
      //       console.log('hhhhhhhhhhhhhhhhhhhhhhhh')
      //       console.log("wawuuuu",course)
      //      return toString(i)  !== toString(index) 
      // }))

      // if(index != -1){
      //   courseList.slice(index, 1);
      //   setCourseList(array)
      // }
   }
  }, [courseList])


  console.log(courseList)

  const submitHandler = (e) =>{
      e.preventDefault();

      const fd = new FormData();
      fd.append('image', this.state.selectedfile, this.state.selectedfile.name)

      axios.post('https://pythocmsapi.herokuapp.com/register', { image: fd, FullName: fullname, DateOfBirth: dateOfBirth}).then(response => {
            setLoading(false);
            setMessage('Success: Student data added')
            // props.history.push('/login');
            // if(response.token){
            //     props.history.push('/login');
            // }else{
            //   props.history.push('/login');
            // }

        }).catch(error => {
          setLoading(false);
          console.log(error);
          if (error.status === 401) setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
          // error.push(error)
        });

           
  }
  
    useEffect(() => {
      console.log(majorfieldvalue)
      console.log(courseList)
    }, [majorfieldvalue])

  return (
    <div>
      {/* {user.name}! */}
      Welcome Teacher: {user} <br /><br />
      {console.log(user)}
      <input type="button" onClick={handleLogout} value="Logout" />

      <form className="form" onSubmit={submitHandler} >
          <div>
            {message? message: error }
          </div>
        <div>
          Register Students
        </div>

        <div>
          <label className="parameter"> Fullname</label>
        <input type="text" placeholder="full-name" onChange={handleOnChange}  />
        </div>
        
        <div>
          <label >Date of birth</label>
          <input type="date" id="birthday" name="birthday" onChange={handleOnChange}/>
        </div>
        
        <div>
          <label>Image</label>
          <input type="file" onChange = {fileSelectorHandler} />
        </div>
        
        <div>
          <label>School Start Year</label>
        <input type="date" placeholder="School Start" onChange={handleOnChange}/>
        </div>


        {/* <div>
          <label>Major Field of Study</label>
          <select >

            {
              majorfield.map(field=>(
                
                <option value={field} key={field} >{field}{console.log("yaaa",field)}</option>
              ))
            }
          </select>
        </div> */}
        
        <div>
          <label>Major Field of Study</label>
          <select onChange={majorFieldChangeHandler} value={majorfieldvalue} >
            {/* {console.log("fo", e)} */}
            <option value="Science" key="1">Science</option>
            <option value="Art" key="2">Art</option>
            <option value="Commercial" key="3">Commercial</option>
          </select>
        </div>

        <div>
        <label>Minor Field of Study</label>
          <select onChange={handleOnChange} value={minorfieldvalue}>
             {options}
          </select>
         
        </div>

        <div>
          <label>Course List</label>
          {
            type2? type2.map((el) => (
              <div key={el}>
                <label htmlFor={el} >{el}
                  <input type="checkbox" id={el} name={el} value={el}   onChange={handleOnClick}  />
                </label>
                
              </div>
            ) ) : <label>Courlist</label>
          }
         
        </div>

        <div>
          {/* <label>Other</label> */}
            {newallCourses? newallCourses.map(e =>(
              <div>
                  <div>
                    <label>Other Courses</label>
                  </div>
                  
                  <label htmlFor={e}>{e}</label>
                  <label> <input type="checkbox"  key = {e} value={e}/></label>
              </div>
              
            )) : <label>Others</label>}
          </div>
        
        
        
        <div>
            <label>Average Grade</label>
          <input type="text" placeholder="average grade" />
        </div>
        
        <div>
          <label>Comment</label>
          <div>
             <textarea value={comment} onChange={handleCommentChange} placeholder="teachers' comment" />
          </div>
       
        </div>
        
        <div>
          <label>Suspended</label>
        <input type="checkbox" checked={suspended} onChange={handleSuspensionChange}/>
        </div>

        <div>

          <fieldset onChange={handleRadioOnChange}>
            <legend>Degree</legend>
            {/* common name attribute */}
              <label><input name="degree" type="radio" value={BA}  /> BA</label>
              <label><input  name="degree" type="radio" value={BSc}  />BSc</label>
              <label><input  name="degree" type="radio" value={PHD} />PHD</label>
          </fieldset>
          
          

        </div>
        
          <div>
            <label>Teacher's Remark</label>
            {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
            <RichTextEditor className="texteditor" editorState={editorState} onChange={setEditorState} />
            {/* <input type="textArea" placeholder="teachers' Remark" /> */}
          </div>
         


          <button className="primary" type="submit">
            Register
          </button>



      </form>
    </div>
  );
}
