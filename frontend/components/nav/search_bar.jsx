import React from 'react';
import SearchDropdownContainer from "./search_dropdown_container";
import If from "../../util/if";

Function.prototype.throttle = function (interval) {
  let tooSoon = false;
  let args;
  return (...cbArgs) => {
    args = cbArgs;
    const context = this;
    const cb = function () {
      context(...args);
    };
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => {
        tooSoon = false;
        cb();
      }, interval);
    }
  };
};

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.node = React.createRef();
    this.handleInput = this.handleInput.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.throttledSearch = this.throttledSearch.bind(this).throttle(1000);
    this.showSearch = this.showSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.state = {search: "", showing: false, category: false, offset: 0};
  }
  handleInput(e){
    if (e.target.value === ""){
      this.setState({ category: false }, this.setState({ search: e.target.value }, this.throttledSearch));
    } else {
      this.setState({search: e.target.value}, this.throttledSearch);
    }
  }
  throttledSearch(){
    this.showSearch(this.state.search != "");
  }
  updateSearch(e){
    e.preventDefault();
    this.showSearch(this.state.search != "");
  }
  showSearch(showing){
    this.props.searchType(this.state.search, this.state.category);
    this.setState({showing});
  }
  handleClick(e){
    if (!this.node.current.contains(e.target)) {
      this.setState({showing: false});
    }
  }
  setCategory(category){
    this.setState({category}, ()=>this.showSearch(true));
  }
  setOffset(offset){
    this.setState({offset});
  }
  handleFocus(e){
    this.showSearch(this.state.search != "");
  }
  componentDidMount(){
    document.addEventListener("click", this.handleClick);
  }
  componentWillUnmount(){
    document.removeEventListener("click", this.handleClick);
  }
  render () {
    return (
      <form className="searchbar" ref={this.node} onSubmit={this.updateSearch}>
        <input type="text" id="search-input" className="search-input" placeholder="Search" onFocus={this.handleFocus} value={this.state.search} onChange={this.handleInput}/>
        <label htmlFor="search-input">
          <i className="fas fa-search" />
        </label>
        <If 
          When={this.state.search}
          Then={
            <i className="close-search fas fa-times" 
              onClick={
                (e)=>{
                  e.preventDefault();
                  this.setState({category: false},
                  this.setState({search: ""}));
                }
              } 
            />
          }
        />
        <If
          When={this.state.showing && this.state.search}
          Then={()=>
            <SearchDropdownContainer 
              showSearch={this.showSearch} search={this.state.search} category={this.state.category} 
              offset={this.state.offset} setOffset={this.setOffset} setCategory={this.setCategory}
            />
          }
        />
      </form>
    );
  }
}
export default SearchBar;