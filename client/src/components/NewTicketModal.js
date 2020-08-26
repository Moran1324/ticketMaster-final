import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const [step, setStep] = useState(1);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTime = new Date();
        const body = {
            "id": uuidv4(),
            "winnerName": input,
            "gameTime": props.gameTime(),
            "date": `${currentTime.getFullYear()}-${currentTime.getMonth().toString().padStart(2, "0")}-${currentTime.getDate().toString().padStart(2, "0")} ${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`
        };
        const res = await axios.post('/api/v1/records', body);
        if (res.data === 'Submitted') {
            setStep(2);
            props.getScore();
        }

    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {step === 1 ?
                <>
                    <h2 id="simple-modal-title">Winner: {props.winner}</h2>
                    <h4>{props.gameTime()}</h4>
                    <form onSubmit={handleSubmit}>
                        <TextField onChange={e => setInput(e.target.value)} label="Enter Your Name" />
                        <br></br>
                        <Button
                            type="submit"
                            color="primary" variant="contained"
                            style={{ marginTop: 20 }}
                        >
                            Submit
                        </Button>
                    </form>
                </>
                :
                <>
                    <h1>Thanks {input}!</h1>
                    <p>Your Data has been Submitted</p>
                </>
            }
        </div>
    );

    useEffect(() => {
        handleOpen();
    }, [])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ textAlign: "center" }}
            >
                {body}
            </Modal>
        </div>
    );
}

// export default MyModal
