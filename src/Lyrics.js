import { Box, Button, Container, TextareaAutosize, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
});

const singers = [
  { id: 1, name:'Ariana Grande', color: '#219C90' },
  { id: 2, name:'Beyonce', color: '#E9B824' },
  { id: 3, name:'Nicki Minaj', color: '#EE9322' },
  { id: 4, name:'Taylor Swift', color: '#D83F31' },
];

function App() {
  const { id } = useParams();
  const [phrase, setPhrase] = useState({});
  const [lyrics, setLyrics] = useState([]);
  const currentPhrase = phrase[id] || '';
  const handleChange = (e) => {
    setPhrase({ ...phrase, [id]: e.target.value });
  };

  useEffect(() => {
    setPhrase('');
  }, [id]);

  useEffect(() => {
    const trimmedPhrase = currentPhrase.trim();

    if (trimmedPhrase === '') return;

    setLyrics((prevLyrics) => {
      const updatedLyrics = [...prevLyrics];

      if (updatedLyrics.length > 0) {
        if (updatedLyrics[updatedLyrics.length - 1].singer.id === parseInt(id)) {
          updatedLyrics[updatedLyrics.length - 1].value = trimmedPhrase;}
        else {
          updatedLyrics.push({
            singer: singers.find((singer) => singer.id === parseInt(id)),
            value: trimmedPhrase,
          });
        }
      }
      else {
        updatedLyrics.push({
          singer: singers.find((singer) => singer.id === parseInt(id)),
          value: trimmedPhrase,
        });
      }
      return updatedLyrics;
    });
  }, [currentPhrase, id]);

return (
  <ThemeProvider theme={theme}>
  <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div>
      <h1 className='h1' style={{textAlign: 'left',}}>Complete The Lyrics</h1>
      <div>
        {singers.map((singer) => (
          <Link to={`/${singer.id}`} key={singer.id} style={{ margin: '8px' }}>
            <Button variant="contained" style={{ backgroundColor: singer.color, color: '#000', height: '60px', width: '240px', fontWeight: 'bold', fontSize: '15px', borderRadius: '20px', border: '2px solid #000', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.8)' }}>
              {singer.name}
            </Button>
          </Link>
        ))}
      </div>
      {id && (
        <div className={`form-container`}>
          <TextareaAutosize minRows={2} maxRows={2} value={currentPhrase} onChange={handleChange} style={{ width: '95%', marginTop: '16px', marginBottom: '16px', borderRadius: '12px', padding: '8px', resize: 'none', border: '3px solid' }} />
        </div>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px', border: '3px solid #000', borderRadius: '12px', paddingTop: '8px', alignItems: 'center', height: '65vh', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', }}>
        {lyrics.map((lyric, index) => (
          <Box key={index} sx={{ bgcolor: singers.find((s) => s.id === lyric.singer.id).color, p: 1, borderRadius: '12px', width: '90%', margin: '5px', height: '30px' }}>
            <Typography variant="body2" style={{ fontSize: '16px', textAlign: 'left' }}>{lyric.value}</Typography>
          </Box>
        ))}
        {!lyrics.length && (
          <Box sx={{ p: 1, borderRadius: '12px', width: '90%', marginBottom: '8px', height: '30px' }}>
          </Box>
        )}
      </Box>
    </div>
  </Container>
  </ThemeProvider>
  );
}

export default App;