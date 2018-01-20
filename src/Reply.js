import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadReply } from './actions';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';



class Reply extends Component {
    componentDidMount() {
      let { loadReply, replyKey, match } = this.props;
      if (! replyKey) {
        replyKey = match.params.replyKey;
      } 
      loadReply(replyKey);
    }

    render() {
      const {reply} = this.props;
      if (reply) {
      return (
        <div>
          <table>
            <tr>
              <td>年份:</td><td>{reply.year}</td>
            </tr>
            <tr>
              <td>部門:</td><td>{reply.bureau}</td>
            </tr>
            <tr>
              <td>總目:</td><td>{reply.head}</td>
            </tr>
            <tr>
              <td>分目:</td><td>{reply.sub_head}</td>
            </tr>
            <tr>
              <td>綱領:</td><td>{reply.programme}</td>
            </tr>
            <tr>
              <td>管制人員:</td><td>{reply.controlling_officer_title} {reply.controlling_officer_name}</td>
            </tr>
            <tr>
              <td>局長:</td><td>{reply.director}</td>
            </tr>
            <tr>
              <td>提問人:</td><td>{reply.member}</td>
            </tr>


          </table>
        <Card>
          <CardMedia title="問題"/>
          <CardContent>
            <Typography type="headline" component="h2">
              問題
            </Typography> 
            <div dangerouslySetInnerHTML={{ __html: reply.question}}/>
          </CardContent>
        </Card>
        <Card>
          <CardMedia/>
          <CardContent>
            <Typography type="headline" component="h2">
              回覆
            </Typography> 
            <div dangerouslySetInnerHTML={{__html: reply.answer}}/>
          </CardContent>
        </Card>
        </div>      
      );
      }
      return (
        <div>
          載入{this.props.key} 發生錯誤 - 404錯誤
        </div>        
      );
    }
}


const mapStateToProps = (state) => {
  console.log(state);
  return {reply: state.reply};
};

const mapDispatchToProps = (dispatch) => {
   return {
     loadReply: (key) => dispatch(loadReply(key))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
