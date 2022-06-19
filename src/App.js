import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import Films from './components/Films/Films';
import { createTheme, ThemeProvider, } from '@mui/material/styles'
import { amber, grey } from '@mui/material/colors';
import { AppBar, Toolbar, Typography } from '@mui/material';


function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: amber,
      secondary: grey
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar color='transparent'>
          <Toolbar className='navbar'>
            <Link to='/' style={{ textDecoration: 'none' }}><Typography className='logo' color="primary">Star Wars App  </Typography></Link>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Filmes/:id' element={<Films />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
