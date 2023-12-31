import { TextField } from "@mui/material";
import "./ChangeInformation.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
function AddCorp() {
    const {state} = useLocation();
    const [ userdata, setUserdata ] =useState("");
    const [ corpdata, setCorpdata] = useState({id:{id:state.userdata.id}});
    const [pwd, setPwd] = useState("");
    const [repwd, setRePwd] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setCorpdata({...corpdata, [name]:value})
       
    }
    const fetchCorp = () =>{
        const token = sessionStorage.getItem("jwt");
        fetch("http://localhost:8090/corporations/add", {
            method: "POST",
            headers: { "Content-Type": "application/json",'Authorization':token },
            body: JSON.stringify(corpdata),
            
          })
           
            .then((response) => {
              
              if (response.ok) {
                fetch("http://localhost:8090/corporations/filtercop"+`/?id=${corpdata.id.id}`,{
                  headers:{'Authorization':token}
                })
                .then(response=>response.json())
                .then(data=>{sessionStorage.setItem("corp", data);})
                .catch((e)=>console.error(e));
            
                navigate("/");
              } else {
              }
            })
            .catch((e) => console.log(e));
    }
  return (
    <div className="SignUpForm">
      <div>
        
        <Typography component="h1" variant="h5" textAlign={"center"}>
          법인등록
        </Typography>
        <div className="textGroup">
          <TextField
            label="사업자 등록번호"
            name="cpNo"
            fullWidth
            // value={formData.memId}
            onChange={handleInputChange}
           
            placeholder=" "
            required
           // 여기서 스타일을 추가합니다.
            sx={{ mt: 3, mb: 1 }}
          />
        </div>
        <div className="textGroup">
          <TextField
            label="CEO"
            name="ceo"
            fullWidth
            // value={formData.memId}
            onChange={handleInputChange}
           
            placeholder=" "
            required
           // 여기서 스타일을 추가합니다.
            sx={{ mt: 3, mb: 1 }}
          />
        </div>
        <div className="textGroup">
          <TextField
            label="회사명"
            name="cp_name"
            fullWidth
            // value={formData.memId}
            onChange={handleInputChange}
            
            placeholder=" "
            required
            
            sx={{ mt: 3, mb: 1 }}
          />
        </div>
        <div className="textGroup">
          <TextField
            label="주소"
            name="cp_addre"
            fullWidth
            // value={formData.memId}
            onChange={handleInputChange}
           
            placeholder=" "
            required
           
            sx={{ mt: 3, mb: 1 }}
          />
        </div>
        <div className="textGroup">
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          onClick={fetchCorp}
        
        >
          법인 등록 
        </Button>
        </div>
        </div>
    </div>
  );
}
export default AddCorp;
