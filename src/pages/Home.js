 import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import{Logo} from "../images/Netflix";
import {ConnectButton,Icon,Button,Modal,TabList,Tab, useNotification} from 'web3uikit';
import{movies} from "../helpers/library";
import{useState} from "react";
import {useMoralis } from 'react-moralis';
import Title from 'antd/lib/skeleton/Title';
import Moralis from 'moralis/types';
const Home = () => {
  const[visible,setVisible]=useState(false);
  const[selectedFilm,setSelectedFilm]=useState();
  const[myMovies,setMyMovies] =useState();
    const{isAuthenticated,Moralis,account}= useMoralis();

  useEffect(()=>{
    async function fetchMyList()
    {
    const thelist=await Moralis.Cloud.run["getMylist",{addrs:account}];
    
  const filterdA=movies.filter(function(e){
    return thelist.indexof(e.Name)> -1;
  })
  setMyMovies(filterdA);
}
  fetchMyList
},[account])
  const dispatch=useNotification();
  const handleNewNotification = ()=>{
    dispatch({
    type:"error",
    Title:"please connect Your crypto Wallet",
    message:"Not Authenticated",
    position:"topl"

  })
}

return(
  <>
  <div className="logo"/>
  <Logo/>
  <div className="connect">
    <Icon fill="#ffffff" size={24}svg="bell"/>
    <ConnectButton/>

  </div>
    
  <div className="topBanner ">
  <TabList
    defaultActiveKey={1}
    tabStyle="bar">
    <Tab tabKey={1} tabName={"Movies "}>
    <div className="scene">
       <img src={movies[0].Scene} 
    className="sceneImg"></img>
       <img className="sceneLogo" src={movies[0].Logo}></img>
      <p className="sceneDesc">{movies[0].Description}</p>
      <div className="playButton">
        <Button
        icon="chevronRightX2"
        text="Play"
        theme="secondary"
        type="button"
        />
        <Button
        icon="plus"
        text="Add to My List"
        theme="translucent"
        type="button"
       onClick={()=>console.log(myMovies)}
        />
      </div>
      </div>
      <div className="title">
        Movies
      </div>
      <div className="thumbs">
        {movies && movies.map((e)=>{
          return(
            <img src={e.Thumnbnail}
            className="thumbnail"
              onClick={()=>{
                setSelectedFilm(e);
                setVisible(true);
              }
              }>
            </img>
          )
         })
         }

      </div>
    </Tab>
    <Tab tabKey={2} tabName={"Series"}> </Tab>
    <Tab tabKey={3 } tabName={"MyList"}></Tab>
    </TabList>
    {selectedFilm && (
    <div className="model">
      <Modal
      onCloseButtonPressed={()=>setVisible(false)}
      isVisible={visible}
      hasFooter={false}
      width="1000px">
        <div className="modelContent">
        <img  src={selectedFilm.Scene}className="modelImg"></img>
        <img className="modalLogo" src={selectedFilm.Logo}></img>
        <div className="modelplayButton">
          {isAuthenticated?(
            <>
                 <Link to="/player" state={selectedFilm.Movie}>
                 <Button
                 icon="chevronRightX2"
                 text="Play"
                 theme="secondary"
                 type="button" 
                   />
                 </Link>
                    <Button
                 icon="plus"
                 text="Add to My List"
                 theme="translucent"
                 type="button"
                 />  </>  ):(
            <>
       <Button
        icon="chevronRightX2"
        text="Play"
        theme="secondary"
        type="button" 
        onClick={handleNewNotification}
        />
         <Button
        icon="plus"
        text="Add to My List"
        theme="translucent"
        type="button"
        onClick={handleNewNotification}
        /></>
        )
        }
      </div>
      
      <div className="movieInfo">
        <div className="details">
          <span>
            Year:
            {selectedFilm.year}
          </span>
          <span>
            Duration:
            {selectedFilm.Duration}
          </span>
      
          Description:
          {selectedFilm.Description}
          
          
          <span>  Genre:
          {selectedFilm.Genre}</span>
        
    
          <span>Actor:
          {selectedFilm.Actors}</span>
          
        </div>
      </div>
        </div>
        </Modal>
    </div>
     ) }
  </div>
  </>
)}

export default Home;
