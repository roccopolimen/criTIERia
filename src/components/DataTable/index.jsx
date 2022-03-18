import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialTable, { MTableBodyRow } from "material-table";
import tableIcons from "./tableIcons";
import { removeExistingFile, removeFromOrder, removeFromTierList } from "api/gist";
import { RUBRIC_KEY } from "constants";
import { dataContext } from "context";
import { convertIdToTitle } from "helpers";
import ScoreModal from "components/ScoreModal";
import { TIER_LIST_KEY } from "constants";
import { tierColors } from "constants";
import { Avatar, IconButton } from "@mui/material";
import ImageModal from "components/ImageModal";
import Loading from "components/Loading";
import { ORDER_KEY } from "constants";

const makeColumns = (adminData, handleImageChange) => {
    const rubric = adminData[RUBRIC_KEY];
    const arr = Object.keys(rubric).map(key => ({title: key, field: key}));
    arr.unshift({
        title: 'Tier',
        field: 'Tier',
        cellStyle: (e, rowData) => {
            return { backgroundColor: tierColors[rowData['Tier']] };
        }
    });
    arr.unshift({ title: 'Score', field: 'Score', defaultSort: 'desc' });
    arr.unshift({ title: 'Title', field: 'Title' });
    arr.unshift({
        title: 'Image',
        field: 'Image',
        render: rowData =>
            <IconButton
                aria-label="change image"
                onClick={() => handleImageChange(rowData)}
            >
                <Avatar
                    src={rowData['Image']}
                    alt={`${rowData['Title']} image`}
                    variant='rounded'
                />
            </IconButton>
    })
    return arr;
};

const DataTable = () => {
    const setOpenEditModal = useState(false)[1];
    const [editModal, setEditModal] = useState(null);
    const [imageModal, setImageModal] = useState(null);
    const [columns, setColumns] = useState(null);
    const { data, adminData, updateData } = useContext(dataContext);
    const { type } = useParams();

    const handleEdit = rowData => {
        setOpenEditModal(true);
        setEditModal(
        <ScoreModal 
            title={rowData['Title']}
            setTitle={(_s) => {}}
            pSetOpen={(_b) => setEditModal(null)}
            open={true}
            setOpen={setOpenEditModal}
            add={false}
            current={rowData}
        />);
    };

    const handleImageChange = (rowData) => {
        setImageModal(
            <ImageModal
                title={rowData['Title']}
                currentImage={rowData['Image']}
                close={() => setImageModal(null)}
            />
        );
    };

    useEffect(() => {
        setColumns(makeColumns(adminData, handleImageChange));
    }, [adminData]);

    if(!columns) return <Loading />;
    return (
        <div>
        <MaterialTable
            icons={tableIcons}
            options={{
                paging: false,
                maxBodyHeight: 600,
                actionsColumnIndex: -1
            }}
            components={{
                Row: props => <MTableBodyRow id={props.data['Title']} {...props} />
            }}
            columns={columns}
            data={Object.values(data)}
            title={convertIdToTitle(type)}
            actions={[{
                icon: () => <tableIcons.Edit />,
                tooltip: 'edit row',
                onClick: (_e, rowData) => handleEdit(rowData)
            }]}
            editable={{
                isDeletable: _r => true,
                onRowDelete: async row => {
                    await removeFromTierList(row['Title'], type, row['Tier'], adminData[TIER_LIST_KEY]);
                    await removeFromOrder(row['Title'], type, adminData[ORDER_KEY]);
                    const newData = await removeExistingFile(type, data, row['Title']);
                    await updateData(newData);
                }
            }}
        />
        {editModal}
        {imageModal}
        </div>
    );
};

export default DataTable;