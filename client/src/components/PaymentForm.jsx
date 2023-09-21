import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'


const PaymentForm = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpiration] = useState("");
  const [ccv, setCcv] = useState("");
  const navigate = useNavigate()

    const SubmitPayment= (e) => {
      e.preventDefault()
      console.log(cardName)
      console.log(cardNumber)
      console.log(expirationDate)
      console.log(ccv)
      navigate(-1)
    }
    return (
      <>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={(e) => {
                setCardName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={(e) => {
                setCardNumber(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={(e) => {
                setExpiration(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={(e) => {
                setCcv(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
              <Button onClick={SubmitPayment}>Submit Payment</Button>
      </React.Fragment>

      </>
    );
  }
  export default PaymentForm