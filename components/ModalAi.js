import { Modal, Divider, Box, Button, Stack, Typography } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import classes from "../styles/checkout/Checkout.module.css";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import React from "react";

export default function ModalAi({ openModal, gotoHome, name, data }) {
    const componentRef = React.useRef(null);
    console.log(name)

    const downloadComponentAsImage = () => {
        html2canvas(componentRef.current).then((canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, `${name}.png`);
            });
        });
    }

    const { ingredients } = data

    let total = 0;

    if (ingredients) {
        for (const ing of ingredients) {
            total += (ing.quantity ? ing.quantity : 0) * (ing.price ? ing.price : 0)
        }
    }

    const ingre = ingredients.map(values => values.name)
    return (
        <Modal
            open={openModal}
            onClose={gotoHome}
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-description"
        >
            <Box
                ref={componentRef}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "400",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: "6px",
                    boxShadow: 24,
                    padding: "2%",
                }}
            >
                <CloseSharpIcon
                    onClick={gotoHome}
                    sx={{
                        color: "#aaaaaa",
                        alignSelf: "end",
                        "&:hover": {
                            color: "#444",
                            transition: "color 0.15s",
                        },
                    }}
                />
                <WaterDropOutlinedIcon fontSize="large" sx={{
                    color: "#de89a1",
                    alignSelf: "center",
                    height: '75px',
                    width: '75px'
                }} />
                <Typography color={"#de89a1"} alignSelf={'center'}>
                    Here's your AI-generated formula!
                </Typography>
                <Typography color={"#545454"} textAlign={'center'} maxWidth={'80%'} fontSize={'11px'} alignSelf={'center'}>
                    This will include the ingredients, directions, as well as the cost estimation of each ingredients.
                </Typography>
                <div style={{ marginTop: '5px' }}>
                    <Divider />
                    <div style={{ margin: "10px" }} className={classes["cost-estimation-wrapper"]}>
                        <p className={classes["cost-estimation-header"]}>
                            Ingredients:
                        </p>
                        <ul style={{ fontSize: "10px" }}>
                            {ingredients.map(values => {
                                const { name, milliliter, quantity } = values
                                return (
                                    <li>
                                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent={'space-between'}>
                                            <div>{name}</div>
                                            <div>{(quantity * milliliter).toFixed(1)} ml</div>
                                        </Stack>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                    <Divider />
                    <div style={{ margin: "10px" }} className={classes["cost-estimation-wrapper"]}>
                        <p className={classes["cost-estimation-header"]}>
                            Directions:
                        </p>
                        <ol style={{ fontSize: "10px" }}>
                            <li>Pour the <b>{ingre.join(', ')}</b> into a glass bottle.</li>
                            <li> Add the drops of essential oils carefully.</li>
                            {/*<li>Place the lid on the bottle and shake gently to ensure all the oils are blended</li>*/}
                        </ol>
                    </div>

                    <Divider />
                    <div style={{ margin: "10px" }} className={classes["cost-estimation-wrapper"]}>
                        <p className={classes["cost-estimation-header"]}>
                            Cost Estimation:
                        </p>
                        <ul style={{ fontSize: "10px" }}>
                            {ingredients.map(values => {
                                const { name, price, quantity } = values
                                const total = parseFloat(quantity) * price
                                return (
                                    <li>
                                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent={'space-between'}>
                                            <div>{`${quantity.toFixed(2)} ml ${name}`}</div>
                                            <div>₱ {total.toFixed(2)}</div>
                                        </Stack>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                    <Divider />
                    <div style={{ margin: "10px" }} className={classes["cost-estimation-wrapper"]}>
                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent={'space-between'}>
                            <p style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Total Estimated Cost:
                            </p>
                            <div style={{ fontSize: "12px", fontWeight: 'bold' }}>
                                ₱ {total.toFixed(2)}
                            </div>
                        </Stack>
                    </div>
                    <Button
                        className={classes["save-copy__button"]}
                        variant="outlined"
                        sx={{
                            alignSelf: "left",
                            padding: "0.8em 2em",
                            marginTop: "10px",
                            textTransform: "uppercase",
                            fontSize: "clamp(10px, 2vw, 12px)",
                            fontFamily: "var(--font-poppins)",
                            fontWeight: "normal",
                        }}
                        onClick={downloadComponentAsImage}
                    >
                        Save a copy
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
