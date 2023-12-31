
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import MyTicket from "../Ticket/MyTicket";
import ChangeInformation from "./ChangeInformation";
import { Navigate, useNavigate } from "react-router-dom";
import TicketFind from "../Ticket/TicketFind";
import { flexibleCompare } from "@fullcalendar/core/internal";
import RentalList from "../rental/RentalList";
function Mypage(){
    const [change, setChange] = useState(1);
    const navigate = useNavigate();
    const onDelClick = (id) => {
        if(window.confirm("정말 탈퇴를 진행합니까?")) {
            const token = sessionStorage.getItem("jwt");
            fetch(`http://localhost:8090/member/remove`, {method: 'DELETE',
                        headers: {'Authorization' : token}
                    })
            .then(response => {
                if(response.ok){
                    sessionStorage.removeItem("jwt");
                    alert("회원 탈퇴가 완료되었습니다.");
                    navigate("/");
                }
                else{
                    alert('Something went wrong!');
                }
                
            })
            .catch(err => console.error(err))
        } 
      }
    return(
        <React.Fragment>
            <Stack className="modalStack"sx={{
                width: "80%",
                height:"1080px",
                minWidth:"1000px",
                backgroundColor: "white",
                padding: "20px",
                outline: "none",
                borderRadius: "5px",
                margin:"auto"}}> {/* Apply the modalStack style */}
                <Stack direction="row" spacing={2} className="tabButtons" sx={{display: "flex"}}> {/* Apply the tabButtons style */}
                    <Button
                        onClick={() => setChange(1)}
                        className="tabButton" // Apply the tabButton style
                        sx={{fontSize: "20px",
                            color: "#303030",
                            fontWeight: "bold",
                            width:"50%"}}
                    >
                        예매 내역
                    </Button>
                    <Button
                        onClick={() => setChange(2)}
                        className="tabButton" // Apply the tabButton style
                        sx={{fontSize: "20px",
                            color: "#303030",
                            fontWeight: "bold",
                            width:"50%"}}
                    >
                        대관 내역
                    </Button>
                    <Button
                        onClick={() => setChange(3)}
                        className="tabButton" // Apply the tabButton style
                        sx={{fontSize: "20px",
                            color: "#303030",
                            fontWeight: "bold",
                            width:"50%"}}
                    >
                        개인정보 수정
                    </Button>
                    <Button
                        onClick={onDelClick}
                        className="tabButton" // Apply the tabButton style
                        sx={{fontSize: "20px",
                            color: "#BB2649",
                            fontWeight: "bold",
                            width:"50%"}}
                    >
                        회원 탈퇴
                    </Button>
                </Stack>
                <hr />
                {change===1?<TicketFind/>:change===2?<RentalList/>:<ChangeInformation/>}
            </Stack>
        </React.Fragment>
    );
}

export default Mypage;