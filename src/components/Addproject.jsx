import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { addProjectsAPI } from "../services/allAPI";
import { addProjectResponseContext } from "../Contexts/ContextShare";

function Addproject() {
  const {addProjectResponse , setAddProjectResponse} = useContext(addProjectResponseContext)
  
//state to hold the value from the input box
  const [projectDetails,setProjectDetails]=useState({
    title:"",
    languages:"",
    github:"",
    website:"",
    overview:"",
    projectimage:""
  })

  const [show, setShow] = useState(false);



  //to hold the url of the image
  const [preview,setPreview] = useState("")
  console.log(projectDetails);

  useEffect(()=>{
    
      //javascript predefined  method -url-create object url
      //-files will be converted in to url
      if(projectDetails.projectimage){setPreview(URL.createObjectURL(projectDetails.projectimage))
    }
    
  },[projectDetails.projectimage])

  // console.log(preview);

  const [token,setToken]=useState("")
  
  useEffect(()=>{
    
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
      
  },[])
  console.log(token);
  console.log(preview);

  const handleClose = () => {setShow(false);
  handleClose1()
}
  const handleShow = () => setShow(true);

  //input box value -text -anenkil=e.target.value il anu kituka 
  //input bot type-file => e.target.filkes[0]

  const handleClose1 = ()=>{
    setProjectDetails({
      title:"",
      languages:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })
    setPreview("")
  }

  const handleAdd = async(e)=>{
    e.preventDefault()

    const {title,languages,github, website,overview, projectimage} = projectDetails

    if(!title|| !languages|| !github|| !website|| !overview|| !projectimage){
      alert("Please fill the form completely")
    }
    else{
      //*reqBody
      // if there is any uploading content from the system we should sent the data or body  in the form of form data
      //create form data 
      //*1) create object for the class form Data
      const  reqBody = new FormData()

      //*2) add value to the form data -  append()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectimage",projectimage)

      //reqheader
      if(token){
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization" : `Bearer ${token}`  //bearer key word user before token only use single space between bearer and token
      }
      
      const result = await addProjectsAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        alert("Project successfully added")
        handleClose()
        setAddProjectResponse(result.data)
      }
      else{
        console.log(result);
        alert(result.response.data)
      }
       }
      }
  }

  return (
    <>
      <div>
        <button onClick={handleShow} style={{background:"green"}} className="btn text-light ">
          Add Projects
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered style={{color:"black"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div style={{ width: "100%" }}>
                <label
                  htmlFor="details"
                  style={{ width: "100%" }}
                  className="p-3"
                >
                  {/* <input id="profile" type="file"  style={{ display: "none" }} onChange={(e)=>isProjectDetails({...projectDetails,projectimage:e.target.files[0]})} /> */}
                  <input type="file" style={{display:"none"}} id="details" onChange={(e)=>setProjectDetails({...projectDetails,projectimage:e.target.files[0]})}/>
                  <img
                    width={"100%"}
                    height={"300px"}
                    src={preview?preview: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?cs=srgb&dl=conifers-daylight-environment-1666021.jpg&fm=jpg"}
                    alt="pic"
                    className="border rounded-4 shadow"
                  />
                  {/* <img width={"100%"}height={"300px"} src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?cs=srgb&dl=conifers-daylight-environment-1666021.jpg&fm=jpg" alt="" /> */}
                </label>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <div className="mb-3  mt-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Title"
                    autoFocus
                    value={projectDetails.title}
                    onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Language Used"
                    value={projectDetails.languages}
                    onChange={(e)=>setProjectDetails({...projectDetails,languages:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Github Link"
                    value={projectDetails.github}
                    onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                  />
                </div>

                <div className="mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Website link"
                    value={projectDetails.website}
                    onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
                  />
                </div>

                <div>
                  <textarea
                    className="form-control"
                    placeholder="Project Overview"
                    rows={2} // Set the number of rows to increase the size
                    value={projectDetails.overview}
                    onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                  ></textarea>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn "
            style={{ background: "red" }}
            onClick={handleClose1}
          >
            Cancel
          </button>
          <button
            className="btn "
            style={{ background: "green" }}
            onClick={handleAdd}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addproject;
