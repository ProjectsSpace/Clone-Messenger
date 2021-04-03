import { makeStyles,Card,CardContent,Typography } from '@material-ui/core'
import React, {forwardRef} from 'react'

const useStyles = makeStyles({
  root: {
    maxWidth: 'fit-content',
    margin: '10px 0',
  },
  root__guestCard: {
    background: '#f7f7f7',
  },
  root__userCard: {
    background: '#4bbcff',
    marginLeft: 'auto',
    textAlign: 'right'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
})

const Message = forwardRef(({currUser,message}, ref) => {

    const isCurrentUser =  currUser === message.username
    const classes = useStyles()

    return (
        <Card ref={ref} className={`${classes.root} ${isCurrentUser ? classes.root__userCard : classes.root__guestCard}`}>
            <CardContent>
                <Typography style={{display: isCurrentUser ? 'none' : ''}} className={classes.title} color="textSecondary" gutterBottom>
                    {message.username}
                </Typography>
                <Typography variant="body2" component="p">
                    {message.message}
                </Typography>
            </CardContent>
        </Card>
    )
})

export default Message
