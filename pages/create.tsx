import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { Grid, Box, Button, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';


const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        //TODO
        try {
            const body = { title, content };
            await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>

              <Box
                component="form"
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
                noValidate
                autoComplete="off"
              >
                <Stack spacing={2}>
                <Typography variant="h2">New Draft</Typography>
                <TextField
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
                  type="text"
                  id="form-title"
                  value={title}
                />
                <TextField 
                  
                  label="Content" 
                  multiline
                  rows={8}
                  id="fullWidth"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  fullWidth />
                <Stack spacing={4} direction="row">
                  <Button 
                    variant="contained"
                    onClick={submitData}
                  >
                    Create
                  </Button>
                  <Button
                    variant='outlined'
                    onClick={() => {Router.push('/')}}
                  >
                    Cancel
                  </Button>
                </Stack>

                </Stack>
                </Box>


        </Layout>
    );
};

// <textarea 
// cols = {50}
// onChange={(e) => setContent(e.target.value)}
// placeholder="Content"
// rows={8}
// value={content}
// />
// <input disabled={!content || !title} type="submit" value="Create" />
// <a className="back" href="#" onClick={() => Router.push('/')}>
//   or Cancel
// </a>
export default Draft;