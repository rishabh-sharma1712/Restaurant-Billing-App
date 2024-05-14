import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppBar, Box, Card, CardContent, TextField, Toolbar, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BillingDetails() {
  let all = {
    kk: "",
    mck: "",
    rm: "",
    gj: "",
    rb: "",
  };

  let unitPrices = {
    priceKK: 800,
    priceMcK: 420,
    priceRM: 280,
    priceGJ: 240,
    priceRB: 550,
  };

  let amountItem = {
    amountKK: 0,
    amountMcK: 0,
    amountRM: 0,
    amountGJ: 0,
    amountRB: 0,
  };

  const tax = 7;

  const [values, setValues] = useState(all);
  const [amount, setAmount] = useState(amountItem);

  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    // console.log("changing", e.target.name, e.target.value);
    // setValues({
    //   ...values,
    //   [e.target.name]: e.target.value,
    // });
    // setValues( prevValues => {
    //   return { ...prevValues,[e.target.name]: e.target.value}
    // })
    let inputVal = e.nativeEvent.data;
    // console.log(inputVal);

    if (Number(inputVal) || inputVal == null || inputVal == 0) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: Number(value) });
    } else {
      return;
    }
  };

  useEffect(() => {
    setAmount((prevAmounts) => {
      // let prevAmtLength = Object.values(prevAmounts).length;
      // for (let i = 0; i < prevAmtLength; i++) {
      // console.log(i);
      // console.log(Object.keys(prevAmounts)[i]);
      // Object.values(prevAmounts)[i] =
      //   Object.values(unitPrices)[i] * Object.values(values)[i];
      // }
      prevAmounts.amountKK = unitPrices.priceKK * values.kk;
      prevAmounts.amountMcK = unitPrices.priceMcK * values.mck;
      prevAmounts.amountRM = unitPrices.priceRM * values.rm;
      prevAmounts.amountGJ = unitPrices.priceGJ * values.gj;
      prevAmounts.amountRB = unitPrices.priceRB * values.rb;
      return { ...prevAmounts };
    });
  }, [values]);

  useEffect(() => {
    setSubTotal(amount.amountKK + amount.amountMcK + amount.amountRM + amount.amountGJ + amount.amountRB);
  }, [amount]);

  useEffect(() => {
    setTaxAmount((subTotal * tax) / 100);
  }, [subTotal]);

  useEffect(() => {
    setTotalAmount(subTotal + taxAmount);
  }, [taxAmount]);

  return (
    <Card>
      <CardContent>
        <Box maxWidth="md" margin="auto" boxShadow={3} bgcolor="background.paper" p={2} marginTop="0px" borderRadius={5}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4">Billing Details</Typography>
            </Toolbar>
          </AppBar>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Item Description</StyledTableCell>
                  <StyledTableCell align="center">Unit Price(Per/Kg)</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Kaju Katli
                  </StyledTableCell>
                  <StyledTableCell align="center">{unitPrices.priceKK}</StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField size="small" style={{ width: 100 }} id="filled-basic" label="Quantity" variant="filled" name="kk" value={values.kk} onChange={handleChange} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{amount.amountKK}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Milk Cake
                  </StyledTableCell>
                  <StyledTableCell align="center">{unitPrices.priceMcK}</StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField size="small" style={{ width: 100 }} id="filled-basic" label="Quantity" variant="filled" name="mck" value={values.mck} onChange={handleChange} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{amount.amountMcK}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Rasmalai
                  </StyledTableCell>
                  <StyledTableCell align="center">{unitPrices.priceRM}</StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField size="small" style={{ width: 100 }} id="filled-basic" label="Quantity" variant="filled" name="rm" value={values.rm} onChange={handleChange} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{amount.amountRM}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Gulab Jamun
                  </StyledTableCell>
                  <StyledTableCell align="center">{unitPrices.priceGJ}</StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField size="small" style={{ width: 100 }} id="filled-basic" label="Quantity" variant="filled" name="gj" value={values.gj} onChange={handleChange} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{amount.amountGJ}</StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Rabri
                  </StyledTableCell>
                  <StyledTableCell align="center">{unitPrices.priceRB}</StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField size="small" style={{ width: 100 }} id="filled-basic" label="Quantity" variant="filled" name="rb" value={values.rb} onChange={handleChange} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{amount.amountRB}</StyledTableCell>
                </StyledTableRow>

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{tax}%</TableCell>
                  <TableCell align="right">{taxAmount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total Amount</TableCell>
                  <TableCell align="right">{totalAmount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
