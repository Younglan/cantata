import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Snackbar } from '@mui/material';
import "./css/RentalList.css";
import { parseJwt } from '../../../loginUtil';
// import { useNavigate } from "react-router-dom";

// const SERVER_URL='http://localhost:8090';

function RentalList(){
    // const navigate = useNavigate();
    //데이터호출
    const[Rental, setRental] = useState([]);
    // const[cpname, setcpname] = useState('1');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);;
    const token = sessionStorage.getItem("jwt");
    

    const columns = [ 

        {field: 'cpNo', headerName: '신청인명',headerAlign: 'center'
        ,valueFormatter: (params) => params.value.ceo}, 

        {field: 'rent_start', headerName: '시작날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 

        {field: 'rent_end', headerName: '종료날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 

        {field: 'rent_date', headerName: '신청날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 
        {field: '_links.self.href',
         headerName: '관리메뉴',
         sortable:false,
         filterable: false,
         renderCell: row =>(
            <button onClick={() => onDelClick(row.row.rentNo)}>취소</button>
        ),},
        {field: 'rent_status',
         headerName: '',
         sortable:false,
         filterable: false,
         renderCell: row =>(
            <React.Fragment>
                {console.log(row.row.rent_status)} {/* 로그를 추가하여 데이터 확인 */}
                {row.row.rent_status === '결제대기' && (
                    <button onClick={() => onPayClick(row.row.rentNo)}>결제</button>
                )}
            </React.Fragment>
         )
        }
    ];

    
    const fetchRentals= () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        fetch(`http://localhost:8090/rentals/selectrent?id=${parseJwt(token)}`,{method:"GET"})
        .then(response => response.json())
        .then(data => {
                
                setRental(data.slice(startIndex, endIndex).reverse());
                setTotalPages(Math.ceil(data.length / pageSize));
            })
        .catch(err => console.error(err));
       
    };
    const rentref = useRef()


    useEffect(() => {
        fetchRentals();
        
    },[rentref, currentPage, pageSize]);

    const onDelClick =(rentNo) => {
        // const updatedSatusData = {rent_status : "cancel"};
        if (window.confirm("정말로 해당 예약를 취소하시겠습니까?")){
            fetch('http://localhost:8090/rentals/delrental?rentNo='+rentNo,
                 {method: 'DELETE',
            })
            .then(response => {
                
                if(response.ok){
                    setRental(prevRental => prevRental.filter(row => row.rentNo !== rentNo));
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
    }
    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? 'activeButton' : ''}
            >
              {i}
            </button>
          );
        }
        return buttons;
      };  


    // `http://localhost:8090/rentals/updateStatus/?status="결제완료"&rentno=${rentNo}`
    const onPayClick = (rentNo) => {
        fetch(`http://localhost:8090/rentals/updateStatus/?status=결제완료&rentno=${rentNo}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rent_status: '결제완료',
          }),
        })
          .then((response) => {
            
            if (response.ok) {
                setRental((prevRental) => prevRental.map(row => row.rentNo === rentNo ? { ...row, rent_status: '결제완료' } : row));
            } else {
              alert('결제 처리 중 오류가 발생했습니다!');
            }
          })
          .catch((err) => console.error(err));
      }; 

    return(
        <div className='Rental_content' >
            <div className='contents'>
            <h1>대관 신청 목록</h1>
                <DataGrid className='rentList'
                    rows={Rental}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.cpNo}/>
                    {/* 페이징버튼 */}
                 <div className="pagination">
                    {/* 가장 첫 페이지로 */}
                    {currentPage > 1 && (
                        <>
                            <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>{"<"}</button>
                        </>
                    )}

                    {renderPageButtons()}

                    {currentPage < totalPages && (
                        <>
                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>{">"}</button>
                            <button onClick={() => setCurrentPage(totalPages)}>{">>"}</button>
                        </>
                    )}
                </div>
                 <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="예약이 삭제되었습니다."
                />
            </div>
        </div>
    );
}


export default RentalList;