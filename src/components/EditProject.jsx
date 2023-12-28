import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from '../services/baseurl';
import Project from '../pages/Project';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function EditProject({project}) {
  const {editProjectResponse , setEditProjectResponse} = useContext(editProjectResponseContext)
     const [show, setShow] = useState(false);
     const [preview,setPreview] = useState("")
     const [projectDetails,setProjectDetails]=useState({
        id: project._id,
        title:project.title,
        languages:project.languages,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectimage:""
      })
     const handleClose = () => {setShow(false); 
    handleClose1() }
     const handleShow = () => setShow(true);
    console.log(project);
    useEffect(()=>{
        if(projectDetails.projectimage){
            setPreview(URL.createObjectURL(projectDetails.projectimage))
            
        }
    },[projectDetails.projectimage])


    const handleClose1=()=>{
        setProjectDetails({
            title:project.title,
            languages:project.languages,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectimage:""
          })
          setPreview("")
    }

    const handleUpdate = async()=>{
        const {id,title,languages,github,website,overview,projectimage}=projectDetails

        if(!title ||!languages ||!github ||!website ||!overview ){
            alert("Please fill the form completely")
        }
        else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("languages",languages)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",project.projectimage)
        

        const token = sessionStorage.getItem("token")

        if(preview){
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization" : `Bearer ${token}` 
              }
              const result = await editUserProjectAPI(id,reqBody,reqHeader)
              console.log(result);
              //after seting backend controller and router
              if(result.status===200 ){
                  console.log(result.data);
                  alert("updated successfully")
                  handleClose()
                  setEditProjectResponse(result.data)
              }
        }
        else{
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization" : `Bearer ${token}` 
              }
              const result = await editUserProjectAPI(id,reqBody,reqHeader)
              console.log(result);
              //after seting backend controller and router
              if(result.status==200 ){
                console.log(result.data);
                alert("updated successfully")
                handleClose()
                setEditProjectResponse(result.data)
            }

        }
      }
    }
    
  return (
    <>
    <button onClick={handleShow}  className="btn "><i class="fa-solid fa-pen-to-square text-info"></i></button>


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
                  <input type="file" style={{display:"none"}} 
                  onChange={e=>setProjectDetails({...projectDetails,projectimage:e.target.files[0]})}  id="details"></input>
                  <img
                    width={"100%"}
                    height={"300px"}
                    src={preview? preview: `${BASE_URL}/uploads/${project.projectimage}`}
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
            onClick={handleUpdate}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject