import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import MeetingTable from './MeetingTable';


class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.searchWithParams = this.searchWithParams.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    this.searchWithParams();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.keyword !== nextProps.match.params.keyword) {
      this.searchWithParams(nextProps);
    }
  }

  searchWithParams(props = this.props) {
    const { keyword } = props.match.params;
    const { search } = props;
    search(keyword);
  }

  handleChangePage(event, page) {
    const { search } = this.props;
    const { keyword } = this.props.match.params;
    search(keyword, page);
  }

  render() {
    const { keyword } = this.props.match.params;
    const { result } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField
              id="search"
              placeholder="關鍵字"
              margin="normal"
              defaultValue={keyword}
              inputRef={(input) => { this.search = input; }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.target.blur();
                  ev.preventDefault();
                  this.props.history.replace(`/search/${ev.target.value}`);
                }
              }}
              style={{ flex: 1 }}
              color="contrast"
            />
            <IconButton
              aria-label="Search"
              onClick={
                (ev) => {
                  ev.preventDefault();
                  const url = `/search/${this.search.value}`;
                  this.props.history.replace(url);
                }
              }
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>


        <AppBar position="static" color="accent">
          <Toolbar>
            &nbsp; 關鍵字 &quot; { keyword } &quot; 搜尋結果
          </Toolbar>
        </AppBar>
        { result.meetings &&
          <MeetingTable
            meetings={result.meetings}
            offset={result.offset}
            total={result.total}
            limit={result.limit}
            handleChangePage={this.handleChangePage}
          /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({ result: state.search });

const mapDispatchToProps = () => { };

Search.propTypes = {
  search: PropTypes.func,
  result: PropTypes.object,
  match: PropTypes.object,
};


Search.defaultProps = {
  result: {},
  search: null,
  match: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);
