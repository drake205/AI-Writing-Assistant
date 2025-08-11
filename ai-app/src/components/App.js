import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../css/app.css';
import Grid from '@mui/system/Grid';
import ResponseArea from './ResponseArea';


function App() {
  const controllerRef = useRef();
  const [responseData, setResponseData] = useState('');
  const [buttonStatus, setButtonStatus] = useState('Process');
  const [showResponseAreas, setShowResponseAreas] = useState(false);
  const [loadingResponses, setLoadingResponses] = useState(false);

  // This useEffect is triggered when the responseData is set to allow the response area heights to be adjusted to match the one in the same row.
  useEffect(() => {
    // If we don't have any data, no need to resize response areas
    if(responseData === '') {
      return;
    }
    else {
      adjustResponseHeights('Professional', 'Casual');
      adjustResponseHeights('Polite', 'Social Media');
    }
  }, [responseData]);

  // This handles to submit of data from the user by sending it to the API and processing the response.
  const handleSubmit = async (inputData) => {
    // Controller to handle cancelling of the API request.
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    // Update areas of the interface to show that data is being loaded.
    setShowResponseAreas(false);
    setLoadingResponses(true);
    setButtonStatus('Cancel');

    // API Call
    try {
      // Sending POST request to Flask API
      const response = await fetch('/getResponse',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: inputData }),
        signal
      }).then((res) => res.json())
      .then((data) => {
        setShowResponseAreas(true);
        setResponseData(data.output_data[0]);
        setButtonStatus('Process');
      });

    }
    catch(error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Fetch error:', error);
      }
      setButtonStatus('Process');  // Reset button state to "Process" after abort or error
    }
  };

  // Function to adjust heights of response areas to match one another.
  const adjustResponseHeights = (area1, area2) => {
    var area1Element = document.getElementById('responseBox_'+area1);
    var area2Element = document.getElementById('responseBox_'+area2);
    var setHeight = Math.max(area1Element.offsetHeight, area2Element.offsetHeight);
    document.getElementById('responseBox_'+area1).style.height = setHeight+'px';
    document.getElementById('responseBox_'+area2).style.height = setHeight+'px';
  }

  // Function to cancel the API call and reset the page to it's default.
  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setLoadingResponses(false);
    setButtonStatus('Process');
  };

  return (
    <div className='mainContent'>
      <Grid container spacing={2} sx={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Grid className='bannerGrid' size={12} sx={{width: '100%', textAlign: 'center'}}>
          <Typography variant='h2' fontFamily='sans-serif' component='div' sx={{ flexGrow: 1, padding: '10px', color: 'white'}}>
            AI Writing Assistant
          </Typography>
        </Grid>
        {showResponseAreas
        ? 
        <>
          <ResponseArea title='Professional' text={responseData['Professional']}></ResponseArea>
          <ResponseArea title='Casual' text={responseData['Casual']}></ResponseArea>
          <ResponseArea title='Polite' text={responseData['Polite']}></ResponseArea>
          <ResponseArea title='Social Media' text={responseData['Social Media']}></ResponseArea>
        </>
        : loadingResponses
        ? <Typography variant='h6' fontFamily='sans-serif' component='div' sx={{ flexGrow: 1, padding: '10px', textAlign: 'center' }}>
            Please wait while your responses are generated...
          </Typography>
        : <Typography variant='h6' fontFamily='sans-serif' component='div' sx={{ flexGrow: 1, padding: '10px', textAlign: 'center' }}>
            Enter any text you want and you'll get it back reworded in 4 different styles (Professional, Casual, Polite, and Social Media).
          </Typography>
        }
        <Grid size={12} sx={{width: '100%', textAlign: 'center', marginTop: '50px'}}>
          <TextField className='textInput' id='input-field' label='Enter Text' variant='outlined' sx={{width: '50%', paddingBottom: '25px'}}/>
        </Grid>
        <Grid size={12} sx={{width: '100%', textAlign: 'center'}}>
          {buttonStatus === 'Process'
          ? <Button variant='contained' size='large' onClick={() => {handleSubmit(document.getElementById('input-field').value)}}>Process</Button>
          : <Button variant='contained' size='large' color='error' onClick={() => {handleCancel()}}>Cancel</Button>}
          
        </Grid>
      </Grid>
    </div>
  )
}

export default App