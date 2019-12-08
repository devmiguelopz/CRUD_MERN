const express = require('express');
const morgan = require('morgan')
const path = require('path')

const {mongoose} = require("./database")

const app = express();




// #region Settings 

app.set('port', process.env.PORT || 3000);

// #endregion

// #region MiddleWares 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


// #endregion

// #region Routes 
app.use("/api/tasks",require("./routes/task.routes"));
// #endregion

// #region Static Files 

// #endregion



app.listen(app.get('port'), () => {
  try {
    console.info(`listening ${app.get('port')}`)
  } catch (e) {
    console.error("app.listen =>", e)
  }
});