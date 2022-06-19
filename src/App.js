// React-Router-Dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Css
import './App.css';

// Components
import Home from './components/Home/Home';
import Films from './components/Films/Films';

// Material
import { createTheme, ThemeProvider, } from '@mui/material/styles'
import { AppBar, Toolbar, Typography } from '@mui/material';

// Color
import { amber, grey } from '@mui/material/colors';

// Icones
import GitHubIcon from '@mui/icons-material/GitHub';

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
          <Toolbar className='navbar' style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to='/' style={{ textDecoration: 'none' }}><Typography color="primary">Star Wars App  </Typography></Link>
            <a href='https://github.com/GustavoBrazThomaz' target='_blank' style={{textDecoration: 'none', color: '#ffc107'}} rel="noreferrer"><GitHubIcon/></a>
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
