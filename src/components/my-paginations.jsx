import React, { useEffect, useState } from 'react';
import { Pagination, Stack, Button } from "@mui/material";

const Mypaginations = ({ count, page, onChange }) => {
  const [currentPage, setCurrentPage] = useState(page);

  const handleNextSkip5 = () => {
    const nextPage = Math.min(currentPage + 5, count);
    setCurrentPage(nextPage);
    onChange(nextPage);
  };

  const handlePreviousSkip5 = () => {
    const previousPage = Math.max(currentPage - 5, 1);
    setCurrentPage(previousPage);
    onChange(previousPage);

  };
  useEffect(()=>{
    if(page==1){
        setCurrentPage(1)
    }
  },[page])

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button className='hidden'  style={{
        textTransform:"none",

      }}  variant="outlined" onClick={handlePreviousSkip5} disabled={currentPage <= 1}>
       Previous
      </Button>
      <Pagination 
      size={'small'}
       siblingCount={0} 
      color="primary"  variant="outlined" shape="rounded" count={count} page={currentPage} onChange={(event, value) => {
        setCurrentPage(value)
        onChange(value)
        }}
         />
      <Button className='hidden' variant="outlined" style={{
        textTransform:"none",
      }} onClick={handleNextSkip5} disabled={currentPage >= count}>
         Next
      </Button>
    </Stack>
  );
};

export default Mypaginations;
