import { Button, Table, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';

import "./css/TicketInfo.css"
import { useContext, useRef } from "react";
import { TicketContext } from "./Ticket";
import ReactToPrint from "react-to-print";
import TicketPaper from "./TicketPaper";

function TicketInfo(prop){
    const ticketInfo = useContext(TicketContext);
    const ref = useRef();

    return(
        <div className="ti_main">
            <div className="ti_header"><div>결제 내역</div></div>
            <div className="ti_cont">
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <tbody>
                      <TableRow>
                        <TableCell align="center" component="th" style={{width:"40%"}}>총 결제금액</TableCell>
                        <TableCell align="center">{ticketInfo.money}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">결제 방법</TableCell>
                        <TableCell align="center">{ticketInfo.catpay==="card"?"카드":ticketInfo.catpay==="ewallet"?"간편결제":ticketInfo.catpay==="mobile"?"휴대폰결제":"무통장입금"}-{ticketInfo.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">결제 금액</TableCell>
                        <TableCell align="center">{ticketInfo.money}(일시불)</TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                </TableContainer>
            </div>
            <div className="ti_info">
                
            </div>
            
            <div className="ti_button">
              <ReactToPrint
                trigger={() => <ColorButton disabled={!ticketInfo.buttonon} variant="contained">발 권</ColorButton>}
                content={() => ref.current}
              />
            </div>
            <div style={{display:"none"}}>
              <TicketPaper ref={ref} ticket={prop.ticket}/>
            </div>
        </div>
    );
}

export default TicketInfo;

const ColorButton = styled(Button)(({ theme }) => ({
    width: "95%",
    color: "white",
    backgroundColor: "#BB2649",
    fontSize : "15px",
    fontWeight : "bolder",
    '&:hover': {
        backgroundColor: "#DD486B",
      },
    '&:disabled': {
        backgroundColor: "#DD486B",
    }
  }));
