import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadReply } from './actions';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import Disqus from './Disqus';
import Share from 'material-ui-icons/Share';


class Reply extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }


    constructor(props) {
      super(props);
      this.renderTable = this.renderTable.bind(this);
      this.renderTab = this.renderTab.bind(this);
      this.changeTab = this.changeTab.bind(this);
      this.renderHeader = this.renderHeader.bind(this);
      this.state = { value: 0 };
    }

    renderHeader() {
      const url = "http://budgetq.g0vhk.io/reply/" + this.props.reply.key;
      return (
        <AppBar position="static" color="accent">
          <Toolbar>
           {this.props.reply.key} - {this.props.reply.member}
           &nbsp;&nbsp;

   <a class="fb-xfbml-parse-ignore" target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)}><Button raised >分享</Button></a>
           &nbsp;&nbsp;
           <Button href={ "https://docs.google.com/forms/d/e/1FAIpQLScn_SK7wtVYHstXJR324vFpe8sFQy8-eSofq8vKpTOAlcvazw/viewform?entry.604171204=" + this.props.reply.key + "&entry.616437323"} target="_blank" raised>
              報告問題
           </Button> 
          </Toolbar>
        </AppBar>
      );
    }


    componentDidMount() {
      let { loadReply, replyKey, match } = this.props;
      if (! replyKey) {
        replyKey = match.params.replyKey;
      } 
      loadReply(replyKey);
    }

    changeTab(evt, value) {
      this.setState({value: value});
    }
     
    renderTab() {
      const { reply } = this.props;
      return (
        <div>
          <AppBar position="static">
            <Tabs value={ this.state.value } onChange={this.changeTab} fullWidth>
              <Tab label="問題" />
              <Tab label="回覆" />
            </Tabs>
          </AppBar>
          {this.state.value == 0 && <div dangerouslySetInnerHTML={{ __html: reply.question}}/>}
          {this.state.value == 1 && <div dangerouslySetInnerHTML={{ __html: reply.answer}}/>}
        </div>
      );
    }
   
    renderTable() {
      const { reply } = this.props;
      return (
        <table>
         <tbody>
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
         </tbody>

        </table>

      );
    }

    render() {
      const {reply} = this.props;
      if (reply) {
       const url = "http://budgetq.g0vhk.io/reply/" + reply.key;
      return (
        <div>
          {this.renderHeader()}
          {this.renderTable()}
          {this.renderTab()}
          <Disqus shortname="budgetq-g0vhk-io" title="aaa" url={url}/>
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
