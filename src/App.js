import {useState,useEffect,useRef} from 'react'
import {Container,AppBar, Button, Box, FormControl, InputLabel, Input, makeStyles} from '@material-ui/core'
import './App.css';
import Message from './Message';
import firebase from 'firebase'
import db from './firebase'
import FlipMove from 'react-flip-move'

const useStyles = makeStyles({
  chatbox: {
    maxHeight: '100vh',
    margin: 'auto',
    overflow: 'scroll',
    overflowX: 'hidden', 
    padding: '0',
    background: 'azure',
    borderRadius: '5px',
  },
  submit_button: {
    verticalAlign:'bottom'
  },
  msg_content: {
    position: 'relative',
    padding: '0 10px',
  },
  msg_writer: {
    textAlign: 'center',
    background: '#e6f7ff',
    borderRadius: '10px',
    margin: '20px 0',
    paddingBottom: '10px',
  }
})

function App() {
  const classes = useStyles()
  const [input,setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [userName, setUserName] = useState('')
  
  // functionality for showing the last message visible
  const scrollToMe = useRef(null)
  useEffect(() => {
    scrollToMe.current && scrollToMe.current.scrollIntoView()
  })

  useEffect(() => {
    setUserName(prompt("Enter Username"))
  },[])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp','asc')
      .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    userName && db.collection('messages').add({
      username: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('')
  }

  return (
    <Container className={classes.chatbox} maxWidth="sm">
      <AppBar position="sticky">
        <h1 style={{textAlign:'center'}}>Messenger</h1>
      </AppBar>

      <FlipMove className={classes.msg_content}>
        {
          messages.map(data => (
            <Message key={data.id} currUser={userName} message={data.message} />
          ))
        }

        {/* <div ref={messagesEndRef} /> */}

      </FlipMove>
      <Box className={classes.msg_writer}>
        <form action="" onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="my-input">Write Message</InputLabel>
            <Input id="my-input" value={input} autoFocus onChange={(e) => setInput(e.target.value)}/>
          </FormControl>
          <FormControl className={classes.submit_button}>
            <Button color="primary" disabled={!input} onClick={handleSubmit} variant="contained">Send message</Button>
          </FormControl>
        </form>
      </Box>
      <div ref={scrollToMe}></div>
    </Container>
  )
}

export default App;
