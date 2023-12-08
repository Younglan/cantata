import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './PerformanceList.css';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SERVER_URL='http://localhost:8090';

function PerformanceList(){
    const navigate = useNavigate();
    //데이터호출
    const[performances, setPerformances] = useState([]);
    const [open, setOpen] = useState(false);

    const columns = [ 
        {field: 'pfCode', headerName: '공연 코드',headerAlign: 'center'}, 
        {field: 'pfCate', headerName: '종류', width: 50,headerAlign: 'center'}, 
        {   field: 'pfTitle', 
            headerName: '공연 제목', 
            width: 300,
            headerAlign: 'center',
        renderCell : row => (
            <div 
                style={{cursor:'pointer'}}
                onClick={() => onRowClick(row.id)}
                >
                    {row.value}
                </div>
        ),
    }, 
        {field: 'pfStart', headerName: '공연기간(시작일)', width: 120}, 
        {field: 'pfEnd', headerName: '공연기간(종료일)', width: 120}, 
        {field: 'agency', headerName: '배급사', width: 100}, 
        {field: '_links.self.href',
         headerName: '',
         sortable:false,
         filterable: false,
         renderCell: row =>
            <button onClick={() => onDelClick(row.id)}>삭제</button>
        }
    ];

    useEffect(() => {
        fetchPerforms();
        
    }, []);

    const fetchPerforms= () => {
        fetch(SERVER_URL+'/performances')
        .then(response => response.json())
        .then(data => setPerformances(data._embedded.performances))
        .catch(err => console.error(err));
    };

    const onRowClick = (url) => {
        console.log(url.substr(35));
        navigate("/PerformanceDetail/"+url.substr(35));
    };

    const onDelClick = (url) => {
    console.log(" url확인 : "+url);
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    fetchPerforms();
                    setOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
        
    }

    return(
        <div className='contentsArea'>
            <div className='contents'>
            
            <button onClick={() => navigate("/performList/newPerform")}>새 컨텐츠 등록</button>
                <DataGrid className='pfList'
                    rows={performances} 
                    columns={columns}
                    disableRowSelectionOnClick={true}
                     getRowId={row => row.pfCode}/> 

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="공연이 삭제되었습니다."
                />

            </div>
        </div>
    );
}


export default PerformanceList;