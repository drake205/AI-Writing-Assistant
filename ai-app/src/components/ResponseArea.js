import Typography from '@mui/material/Typography';
import '../css/responseArea.css';
import Grid from '@mui/system/Grid';


/**
 * This component is used to create a response area for individual LLM responses.
 * 
 * Input Vars:
 * title (string): The title of response area.
 * text (string): The rewored text from the LLM that corresponds to the title.
 */

function ResponseArea({title, text}) {
  return (
    <div className='responseBox'>
        <Grid id={'responseBox_'+title} className={'responseBox_'+title} size={12} sx={{width: "100%", height: '50%',  textAlign: 'center', marginTop: '5%', backgroundColor: '#d8d8d8', borderRadius: '25px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            <Typography variant="h4" fontFamily='sans-serif' component="div" sx={{ flexGrow: 1}}>
                {title}
            </Typography>
            <Typography className="output-field" variant="h6" fontFamily='sans-serif' component="div" sx={{ flexGrow: 1, padding: '10px'}}>{text}</Typography>
        </Grid>
    </div>
  )
}

export default ResponseArea