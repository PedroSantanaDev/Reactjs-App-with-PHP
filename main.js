/*
Author: Pedro Santana Minalla

ReactJS and Single-Page Applications

*/


// Shortcut code that allows us to write ReactRouter tags as <Link /> instead 
// of <ReactRouter.Link />
var { hashHistory,
      IndexLink,
      IndexRoute,
      Link,
      Route,
      Router} = ReactRouter;

/*==========================================================================================*/
/**
*App component
*Return nav links and footer
*/
/*==========================================================================================*/
var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Catbook</h1>
        <ul className ="header">
          <li><IndexLink to="/" activeClassName ="active">Home</IndexLink></li>
          <li><Link to="/newsfeed" activeClassName="active">Newsfeed</Link></li>
          <li><Link to="/cats" activeClassName="active">Cats</Link></li>
          <li><Link to="/search" activeClassName="active">Search</Link></li>
          <li><Link to="/extrafeature" activeClassName="active">Extra Feature</Link></li>
        </ul>
      <div className="content">
        {this.props.children}
      </div>
      <div className="footer">
        <p>Catbook - Copyright 2017</p>
      </div>
      </div>
    )
  }
});
/*=======================================================================================================*/
/**
*Home component
*/
/*=======================================================================================================*/
var Home = React.createClass({
  render: function() {
    return (
      <div>
      <p>Welcome to Catbook!</p>
      </div>
    )
  }
});

/*=========================================================================================================*/
/**
*Newsfee class. Get json data with all news feed data.
*/
/*=========================================================================================================*/
var GetCatsPosts = React.createClass({
  callback:function(result,i){
    var data;
    if(this.props.parentComponent == "Newsfeed"){
       data = (
                <div key={i} className="col-lg-3 col-md-3 col-md-offset-2 col-sm-6 col-xs-6 col-lg-offset-2">
                  <div key={i}>
                    <img src={"images/" + result.POSTIMAGE}></img>
                    <p>{result.BODY}</p> 
                    <p className="text-info">by {result.NAME}</p>
                    <img src={"images/" + result.CATIMAGE}></img>
                    <p className="text-info">Posted on: {result.POSTTIME}</p>
                  </div>
                </div>
              )
    }
      return(data);
  },
  render:function(){

    return (
    <div className="col-lg-12">
      {this.props.posts.map(this.callback)}
    </div>
    );

  }
});
/*================================================================================================*/
/**
*Newsfeed Component.
*Renders newsfeed data
*/
/*================================================================================================*/
var Newsfeed = React.createClass({
  //initial state of component
  getInitialState: function() {
    return {
      posts: []
    }
  },
  //Gets json data
  componentDidMount: function(){
        var state = this;
        var allposts = $.getJSON('https://csunix.mohawkcollege.ca/~000313753/private/10125/2/backend.php?action=allposts', function (data) {
            state.setState({
                posts: data
            });
        });
    },
  //Render that data
  render: function() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <h1 className="bg-primary text-center">Newsfeed</h1>
            </div>
          </div>
          <div className="row">
            <GetCatsPosts parentComponent="Newsfeed" posts = {this.state.posts}  />
          </div>
        </div>
    )
  }
});
/*==========================================================================================*/
/**
*DisplayAllCats component.
*@returns cats data
*/
/*==========================================================================================*/
var DisplayAllCats = React.createClass({
 displayAll:function(astate,key){
  if(this.props.catpage){
   return (
    <div key = {key} className="col-lg-12">
      <p>Name: {astate.NAME}</p>
       <p>Owner: {this.props.owner}</p>
       <p>Age: {this.props.age}</p>
       <p>Posts: {astate.BODY}</p>
     </div>);
  }
  else{
   return (
    <div className="col-lg-3" key = {key}>
       <img width = "50" height = "50" src={"images/"+astate.CATIMAGE} /> 
       <p>Name: {astate.NAME}</p>  
       <p>Owner: {this.props.owner}</p> 
       <p>Age: {this.props.age} </p>
       <p>{astate.BODY}</p>
       <p>Posts: {astate.POSTTIME}</p>
      <img width = "50" height = "50" src={"images/"+astate.POSTIMAGE} />
     </div>);
  }
  
 },
 render:function(){
  return (<ul>
    {this.props.cats.map(this.displayAll)}
    </ul>);
 }
});
/*===================================================================================================*/
/**
*Cats component.
*Renders cats
*/
/*====================================================================================================*/
var Cats = React.createClass({
 getInitialState: function(){
  return {
    clickedCat: false,
    linkAllCats: 'https://csunix.mohawkcollege.ca/~000313753/private/10125/2/backend.php?action=allcats',
    linkCatPost: 'https://csunix.mohawkcollege.ca/~000313753/private/10125/2/backend.php?action=catposts&catid=',
    allCats:[],
    clickedCatInfo:[]
  }
    
 },
  componentWillMount: function() {
    $.ajax({
      url:this.state.linkAllCats,
      dataType: 'json',
      method:'get',
    success:function (result) {
         this.setState({
           allCats: result
         });
      }.bind(this)
    });
 },
  catClicked:function(id){
    $.ajax({
      url:this.state.linkCatPost+id,
      dataType: 'json',
      method:'get',
       success:function (result) {
             this.setState({
              clickedCat:true,
               clickedCatInfo: result
             });
          }.bind(this)
      });
  },
   clickedCatOwner:'',
   clickedCatAge: '',
   displayAllCAts:function(astate,key){
    this.clickedCatOwner = astate.OWNER;
    this.clickedCatAge = astate.AGE;
    return (
      <div className="col-lg-3" key = {key}>
       <img src = {"images/"+astate.CATIMAGE} onClick = {this.catClicked.bind(this,astate.ID)} />
       <p className="text-info">{astate.NAME}</p>
       </div>
      )
   },
 render:function(){
  return (
    <div className="container">
      <h1 className="bg-primary text-center">Cats page</h1>
      <div className="col-lg-12">
       {this.state.allCats.map(this.displayAllCAts)}
       {this.state.clickedCat?<DisplayAllCats catpage = {true} owner = {this.clickedCatOwner} age = {this.clickedCatAge} cats = {this.state.clickedCatInfo} />:''}

       </div>
   </div>);
 }
});

/*===============================================================================================*/
/**
*DoSearch component
*@return search results
*/
/*===============================================================================================*/
var DoSearch = React.createClass({
 getPosts:function(result,key){
  if(result.BODY.search(this.props.searchString) != -1){
   return (<tr key = {key}>
      <td>{result.NAME}</td> 
      <td>{result.OWNER}</td>
      <td>{result.BODY}</td>
     </tr>);
  }else{
   return null;
  }
 },
 render:function(){
  return (<tbody>
    {this.props.allposts.map(this.getPosts)}
   </tbody>);
 }
});
var Search = React.createClass({
 getInitialState:function(){
  return {
   searchString:'',
   allposts:[],
   link:'https://csunix.mohawkcollege.ca/~000313753/private/10125/2/backend.php?action=allposts',
   doCatSearch:false
  }
 },
 inputSearch: function(event){
  var value = event.target.value;
  $.ajax({
   url:this.state.link,
   dataType: 'json',
   method:'get',
   success:function (result) {
    this.setState({
     searchString:value,
     allposts:result,
     doCatSearch:true
    });
   }.bind(this)
  });
 },
 render:function(){
  return (<div>
     <h1 className="text-info">Search Cats Info</h1>
     <p onClick={this.inputSearch} className="text-info">Yarn</p>
     <p onClick={this.inputSearch} className="text-info">Today</p>
     <p onClick={this.inputSearch} className="text-info">Gar</p>
     <p onClick={this.inputSearch} className="text-info">Friend</p>
     <p onClick={this.inputSearch} className="text-info">Woah</p>
     <input type="text" id= "search" onChange = {this.inputSearch}  />
     <table className="table">
      <thead>
       <tr>
        <th>Name</th>
        <th>Owner</th>
        <th>Body</th>
       </tr>
      </thead>
      {this.state.doCatSearch ? <DoSearch allposts = {this.state.allposts} searchString = {this.state.searchString}  />: <tbody></tbody>}
     </table>
    </div>);
 }
});

/*===============================================================================================*/
/**
*EtraFeauture component
*@return draggable cat images
*/
/*==============================================================================================*/
var ExtraFeature = React.createClass({
  getInitialState: function(){
  return {
    clickedCat: false,
    linkAllCats: 'https://csunix.mohawkcollege.ca/~000313753/private/10125/2/backend.php?action=allcats',
    allCats:[]
  } 
 },
  componentWillMount: function() {
    $.ajax({
      url:this.state.linkAllCats,
      dataType: 'json',
      method:'get',
    success:function (result) {
         this.setState({
           allCats: result
         });
      }.bind(this)
    });
 },
 displayAllCAts:function(astate,key){
    return (<ReactDraggable key={key}>
      <div className="col-lg-3" key = {key}>
       <img src = {"images/"+astate.CATIMAGE} />
       </div>
      </ReactDraggable>)
   },
  render: function() {
    return (
      <div className="container">
        <h1 className="bg-primary text-center">React draggable component</h1>
        <h3 className="text-info">Grab a cat image and drag it around the page.</h3>
        {this.state.allCats.map(this.displayAllCAts)}
      </div>
      )
    }
});
/*====================================================================================================*/
/**
*Renders components
*/
/*====================================================================================================*/
ReactDOM.render(
   <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="newsfeed" component={Newsfeed} />
      <Route path="cats" component={Cats} />
      <Route path="search" component={Search} />
      <Route path="extrafeature" component={ExtraFeature} />
    </Route>
  </Router>
  ,document.getElementById("app")
);