import { useState } from 'react';
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import DataTable from "components/DataTable";
import TitleModal from 'components/TitleModal';

const TablePage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <div>
            <DataTable />
            <TitleModal open={open} setOpen={setOpen} />
            <SpeedDial
                ariaLabel="add new entry"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={handleOpen}
            />
        </div>
    );
};

export default TablePage;